# ADADP Simulator

**Atmospheric Drag And Dynamics Physics**

> **Try it live:** [adadp.avibega.tech](https://adadp.avibega.tech)

A real-time 2D physics playground where you drop one or two objects, apply custom gravity and atmospheric drag (including directional airflow), and watch them interact.

Built for desktop and laptop screens.

---

## About

ADADP Simulator is an interactive environment for exploring motion under gravity and fluid resistance. Configure the world, introduce objects into the scene, and observe how forces shape their trajectories in real time — with telemetry that makes the underlying dynamics visible, not just animated.

---

## Roadmap / Future Progress

The following capabilities are planned or in progress and are not yet fully represented in the live product:

| Area | Planned work |
| --- | --- |
| Multi-body interaction | Support for one or two concurrent objects with mutual interaction |
| Atmospheric drag | Quadratic / linear drag models with tunable coefficients |
| Directional airflow | Wind / airflow fields that bias drag along configurable directions |
| Canvas trajectory overlay | Optional on-canvas path rendering for object trajectories |
| Expanded telemetry | Deeper charting and analysis as new force models land |
| Simulation controls | Further refinement of timestep, timescale, and run duration |

Current public builds may expose a subset of free-fall, collision, and charting features while the items above continue to mature.

---

## Stack

- [Next.js](https://nextjs.org) · [React](https://react.dev) · [TypeScript](https://www.typescriptlang.org)
- [Zustand](https://zustand-demo.pmnd.rs) for application state
- [Recharts](https://recharts.org) for telemetry visualization
- [Tailwind CSS](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com)

---

## License

This project is open source under the [MIT License](./LICENSE).

---

## Author

Built by [avibega23](https://github.com/avibega23) · [@avibega23](https://x.com/avibega23)
