# ADADP Simulator

**Atmospheric Drag And Dynamics Physics** — an interactive 2D physics simulator for exploring free fall, collisions, and motion under gravity.

> **Try it live:** [adadp.avibega.tech](https://adadp.avibega.tech)

Built for desktop and laptop screens.

---

## What it does

Configure a world, drop an object, and watch the simulation respond in real time. Tune gravity, mass, restitution, and initial velocity from the control panel, then inspect the motion through live telemetry charts.

### Simulation

- Constant-g free-fall integration with ground and wall collisions
- Configurable world size, gravity, object radius/mass, and initial velocity
- Restitution (bounciness) on floor impacts
- Play / pause / reset playback controls

### Telemetry

Live charts driven by the simulation state:

| Chart | What it shows |
| --- | --- |
| Velocity vs time | `vx`, `vy` |
| Acceleration vs time | `ax`, `ay` |
| Position vs time | `x`, `y` |
| Speed vs time | `√(vx² + vy²)` |
| Kinetic energy vs time | `½ m \|v\|²` |
| Trajectory | `y` vs `x` |

Toggle any chart from the **Charts** section in the control panel.

### Interface

- Canvas viewport with world ↔ pixel scaling
- Scrollable control panel for ground, object, collision, and simulation settings
- Full-width telemetry strip under the canvas and panel
- Desktop-first layout (mobile visitors see a clear “use a computer” gate)

---

## Stack

- [Next.js](https://nextjs.org) · [React](https://react.dev) · [TypeScript](https://www.typescriptlang.org)
- [Zustand](https://zustand-demo.pmnd.rs) for app state
- [Recharts](https://recharts.org) for telemetry
- [Tailwind CSS](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com)

---

## License

This project is open source under the [MIT License](./LICENSE).

---

## Author

Built by [avibega23](https://github.com/avibega23) · [@avibega23](https://x.com/avibega23)
