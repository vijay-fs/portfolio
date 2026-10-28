(() => {
  const TAU = Math.PI * 2;
  const smooth = (a, b, t) => {
    const n = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return n * n * (3 - 2 * n);
  };

  class EngineBlueprint extends HTMLElement {
    connectedCallback() {
      if (this.canvas) return;
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<style>:host{isolation:isolate}canvas{position:absolute;inset:0;display:block;width:100%;height:100%}</style><canvas aria-hidden="true"></canvas>';
      this.canvas = shadow.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', 'Animated blueprint of a four-cylinder engine rotating, separating into its components with dimension lines, and reassembling.');
      this.time = 0;
      this.visible = false;
      this.media = matchMedia('(prefers-reduced-motion: reduce)');
      this.abort = new AbortController();
      const options = { signal: this.abort.signal };

      this.media.addEventListener('change', () => { this.draw(); this.sync(); }, options);
      document.addEventListener('visibilitychange', () => this.sync(), options);

      this.resize = new ResizeObserver(() => {
        const rect = this.getBoundingClientRect();
        this.w = rect.width;
        this.h = rect.height;
        const ratio = Math.min(devicePixelRatio || 1, 2);
        this.canvas.width = Math.round(this.w * ratio);
        this.canvas.height = Math.round(this.h * ratio);
        this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.draw();
      });
      this.resize.observe(this);
      this.intersection = new IntersectionObserver(entries => {
        this.visible = entries[0].isIntersecting;
        this.sync();
      }, { threshold: 0.01 });
      this.intersection.observe(this);
      this.tick = now => {
        this.frame = 0;
        if (!this.running()) return;
        this.time += Math.max(0, Math.min((now - this.last) / 1000, 0.05));
        this.last = now;
        this.draw();
        this.frame = requestAnimationFrame(this.tick);
      };
    }

    disconnectedCallback() {
      cancelAnimationFrame(this.frame);
      this.resize?.disconnect();
      this.intersection?.disconnect();
      this.abort?.abort();
    }

    running() {
      const dialog = this.closest('dialog');
      const coveredByDialog = !dialog && document.querySelector('dialog[open]');
      return this.isConnected && this.visible && !this.media.matches && !document.hidden && !coveredByDialog;
    }

    sync() {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      if (this.running()) {
        this.last = performance.now();
        this.frame = requestAnimationFrame(this.tick);
      }
    }

    draw() {
      if (!this.w || !this.h || !this.ctx) return;
      const c = this.ctx, w = this.w, h = this.h;
      const cycle = this.time % 18;
      const explode = this.media.matches ? 1 : smooth(2, 6, cycle) * (1 - smooth(11, 15, cycle));
      const yaw = this.media.matches ? -0.62 : -0.62 + Math.sin(this.time * .19) * .52;
      const pitch = .4;
      const scale = Math.min(w * .125, h * .073);
      const center = [w * .5, h * .54];
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const project = ([x, y, z]) => {
        const rx = x * cy + z * sy, rz = -x * sy + z * cy;
        return [center[0] + rx * scale, center[1] + (-y * cp + rz * sp) * scale, rz * cp + y * sp];
      };

      c.clearRect(0, 0, w, h);
      const wash = c.createRadialGradient(w * .45, h * .42, 0, w * .5, h * .5, h * .8);
      wash.addColorStop(0, '#657343');
      wash.addColorStop(1, '#344326');
      c.fillStyle = wash;
      c.fillRect(0, 0, w, h);
      c.lineWidth = .5;
      const grid = Math.max(18, w / 16);
      for (let i = 0; i < w / grid; i++) {
        c.strokeStyle = i % 4 ? '#ffffff12' : '#ffffff28';
        c.beginPath(); c.moveTo(i * grid, 0); c.lineTo(i * grid, h); c.stroke();
      }
      for (let i = 0; i < h / grid; i++) {
        c.strokeStyle = i % 4 ? '#ffffff12' : '#ffffff28';
        c.beginPath(); c.moveTo(0, i * grid); c.lineTo(w, i * grid); c.stroke();
      }

      const line = (points, color, width = .8, dash = []) => {
        c.strokeStyle = color; c.lineWidth = width; c.setLineDash(dash);
        c.beginPath(); points.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.setLineDash([]);
      };
      const line3 = (a, b, color, width, dash) => line([project(a), project(b)], color, width, dash);
      const surfaces = [];
      const polygon = (points, color = '#8ad9e4b0', fill = '#143d4ddd', width = .75) => {
        const p = points.map(project);
        surfaces.push({ p, color, fill, width, depth: p.reduce((n, v) => n + v[2], 0) / p.length });
      };
      const box = (x, y, z, dx, dy, dz, color, fill) => {
        const v = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(p => [x+p[0]*dx/2,y+p[1]*dy/2,z+p[2]*dz/2]);
        [[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[1,5,6,2],[0,3,7,4]].forEach(face => polygon(face.map(i => v[i]), color, fill));
      };
      const cylinder = (x, y, z, r, length, axis = 'y', color = '#a1e4eac9', fill = '#173f4fdf', rotation = 0, teeth = 0) => {
        const point = (angle, offset, radius = r) => {
          const a = Math.cos(angle + rotation) * radius, b = Math.sin(angle + rotation) * radius;
          return axis === 'x' ? [x + offset, y + a, z + b] : [x + a, y + offset, z + b];
        };
        const count = teeth ? teeth * 4 : 24;
        const rings = [-length/2,length/2].map(offset => Array.from({length: count}, (_, i) => point(i * TAU / count, offset, teeth && i % 4 < 2 ? r * .88 : r)));
        polygon([...rings[0]].reverse(), color, fill);
        polygon(rings[1], color, fill);
        for (let i = 0; i < count; i++) polygon([rings[0][i],rings[0][(i+1)%count],rings[1][(i+1)%count],rings[1][i]], i % 4 ? '#6ec4d35c' : color, fill, .55);
      };

      // Exploded-view construction axes remain behind the component geometry.
      if (explode > .03) {
        const alpha = Math.round(explode * 95).toString(16).padStart(2, '0');
        [-1.8,-.6,.6,1.8].forEach(x => line3([x,-2.6-2*explode,0],[x,1.9+3.7*explode,0],`#ffffff${alpha}`,.6,[3,5]));
      }

      const sumpY = -1.9 - explode * 1.8;
      box(0,sumpY,0,4.85,.65,1.6,'#72c5d9a0','#0b2a3be8');
      box(0,sumpY+.36,0,5.1,.13,1.85,'#b2e7e7b0','#163c4bdc');
      const crankY = -.95 - explode * .55;
      cylinder(0,crankY,0,.17,5.6,'x');
      const spin = this.media.matches ? .45 : this.time * 1.2;
      [-1.8,-.6,.6,1.8].forEach((x,i) => {
        const theta = spin + (i % 2 ? Math.PI : 0);
        const oy = Math.cos(theta) * .32, oz = Math.sin(theta) * .32;
        cylinder(x,crankY,0,.45,.16,'x','#9ed8dfaa','#164556df',theta,6);
        cylinder(x,crankY+oy,oz,.14,.35,'x');
        const pistonY = .18 + explode * 1.35 + (1 - explode) * oy * .55;
        box(x,pistonY-.68,oz*.4,.15,.96,.17,'#c3e7e9ba','#234e5bdc');
        cylinder(x,pistonY,0,.43,.64);
        cylinder(x,pistonY+.18,0,.445,.045,'y','#d8f6f2ed','#24596add');
        cylinder(x,pistonY+.1,0,.445,.035,'y','#c2f0f0d0','#1c4b5ccc');
      });
      // A translucent block leaves the piston/shaft relationship legible.
      box(0,.15,0,4.9,1.5,1.75,'#70c4d1bd','#11344491');
      box(0,.94,0,5.06,.14,1.88,'#a5e3e8c4','#204c5ba8');
      [-1.8,-.6,.6,1.8].forEach(x => cylinder(x,1.025,0,.45,.03,'y','#a1e3e3d4','#082a3dbb'));
      for (let i=0;i<8;i++) box(-2.12+i*.605,.18,-.91,.1,1.1,.08,'#65b7c26b','#143b4b9a');
      const headY = 1.22 + explode * 2.4;
      box(0,headY,0,5.08,.45,1.86,'#b5e9e9d9','#184353e6');
      box(0,headY+.26,0,5.15,.1,1.93,'#b3e4e4bd','#215465e8');
      const coverY = 1.78 + explode * 3.7;
      box(0,coverY,0,4.95,.6,1.63,'#b7ecebe0','#205467e8');
      [-.54,0,.54].forEach(z => box(0,coverY+.33,z,4.4,.06,.045,'#c0efecd9','#2f6878e8'));
      [-2.1,2.1].forEach(x => [-.66,.66].forEach(z => {
        cylinder(x,headY+.4+explode*.55,z,.075,.35,'y','#e1bf83cc','#577070dd');
        cylinder(x,headY+.6+explode*.55,z,.12,.07,'y','#f0d09ae0','#547078ee',0,6);
      }));
      cylinder(2.83+explode*.5,crankY,0,.83,.2,'x','#a9e4e4d4','#1e4e5fdf',spin,12);
      cylinder(2.98+explode*.5,crankY,0,.29,.24,'x','#d0efeddf','#163c50ec',spin);

      surfaces.sort((a,b) => b.depth - a.depth);
      for (const surface of surfaces) {
        c.beginPath(); surface.p.forEach((p,i) => i ? c.lineTo(p[0],p[1]) : c.moveTo(p[0],p[1]));c.closePath();
        c.fillStyle='#495a315c';c.fill();
        c.strokeStyle='#ffffff'+(surface.color.length===9?surface.color.slice(-2):'cc');
        c.lineWidth=Math.max(.65,surface.width);c.stroke();
      }

      const text = (value,x,y,size=9,color='#a3ccd4',align='left') => {
        c.font = `${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        c.fillStyle=color;c.textAlign=align;c.fillText(value,x,y);
      };
      const dimension = (a,b,label) => {
        const p=project(a),q=project(b);
        line([p,q],`rgba(255,255,255,${explode*.85})`,.8);
        [p,q].forEach(v=>line([[v[0]-3,v[1]-5],[v[0]+3,v[1]+5]],`rgba(255,255,255,${explode*.85})`,.8));
        c.save();c.globalAlpha=explode;
        const x=(p[0]+q[0])/2,y=(p[1]+q[1])/2;
        c.fillStyle='#4e6035';c.fillRect(x-28,y-8,56,15);
        text(label,x,y+3,9,'#ffffff','center');c.restore();
      };
      if (explode > .03) {
        c.save();c.globalAlpha=explode;
        const partLabel = (value, point, offset) => {
          const p=project(point), y=p[1]+offset;
          line([[pad,y+4],[pad+36,y+4],[p[0],p[1]]],'#ffffff9a',.6);
          text(value,pad,y,7,'#ffffff');
        };
        const pad=Math.max(17,w*.065);
        partLabel('01 / COVER',[-2.475,coverY,0],-14);
        partLabel('02 / HEAD',[-2.54,headY,0],-10);
        partLabel('03 / SHAFT',[-2.7,crankY,0],-12);
        c.restore();
        dimension([-2.45,-4.25,1.2],[2.45,-4.25,1.2],'480 mm');
        line3([-2.45,sumpY-.3,.8],[-2.45,-4.45,1.2],`rgba(255,255,255,${explode*.5})`,.6);
        line3([2.45,sumpY-.3,.8],[2.45,-4.45,1.2],`rgba(255,255,255,${explode*.5})`,.6);
        const p=project([1.8,1.7+explode*1.35,0]);
        line([p,[p[0]+16,p[1]-17],[Math.min(w-18,p[0]+62),p[1]-17]],`rgba(255,255,255,${explode*.8})`,.7);
        c.save();c.globalAlpha=explode;text('Ø 86',Math.min(w-18,p[0]+62),p[1]-22,9,'#ffffff','right');c.restore();
      }


    }
  }

  customElements.define('engine-blueprint', EngineBlueprint);
  // A modal temporarily covers the card; resume it when the modal closes.
  document.querySelectorAll('dialog').forEach(dialog => {
    new MutationObserver(() => document.querySelectorAll('engine-blueprint').forEach(engine => engine.sync())).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  });
})();
