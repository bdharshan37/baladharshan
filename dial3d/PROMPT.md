# Prompt: a real rotary dial, in 3D, with its physics intact

> You are a senior 3D artist and motion designer who has built tactile product simulations before. Build a **standalone, physically believable rotary telephone dial** in Three.js. It is not a diagram of a dial. It is a small machine that a person can pull, feel resist, release, and hear. Everything below is required. If you are unsure, choose the behaviour of the real object.

## 1. Reference (the attached photo)

Study it before modelling. What matters:

- A **clear acrylic finger plate** with **ten circular holes**, thick enough to show bevelled, refracting edges.
- Behind the holes, **white discs carrying black numerals** (1–9 then 0), fixed to the housing and **upright**, not rotated with the plate.
- A **large blank, slightly domed centre cap**, satin white, ringed by a polished chrome lip. It does not rotate.
- A **chrome finger stop** at about 4 o'clock, in the gap between 1 and 0. It is a flat tapered bar that sits **above** the plate and does not rotate.
- A **brushed silver ring** around the plate and a **black housing** behind it.
- The numerals run **counter-clockwise from 1** (top right) round to 0 (just above the stop).

## 2. Geometry (build it, do not fake it)

Face points toward +Z. Angles are degrees **clockwise from 12 o'clock**. Units: outer radius ≈ 3.

| Part | Spec |
|---|---|
| Housing | Black bakelite cylinder, soft shoulder, receives shadows |
| Bezel | Chrome lathe profile: rounded, ~0.3 wide, sits proud of the plate |
| Number plate | Fixed disc, silver; ten white discs r≈0.46 at radius 2.28 with upright numerals; drawn to a 2048² canvas texture |
| Finger plate | `ExtrudeGeometry` of a ring (outer 2.96, inner 1.76) with **ten holes r=0.40 at radius 2.28**; depth 0.14; **bevel 0.035, 4 segments** so every hole edge catches light |
| Plate rims | Thin chrome torus at the outer edge and inner lip; they rotate with the plate |
| Centre cap | Lathe dome, satin white, fixed |
| Finger stop | Extruded tapered bar at **122°**, chrome, beveled, fixed, above the plate |
| Hole angles | `H(d) = 100 − 30·n` where `n = d` for 1–9 and `10` for 0 |
| Travel to stop | `R(d) = 122 − H(d) = 22 + 30·n` degrees (1 → 52°, 0 → 322°) |

## 3. Materials and light

- **Acrylic**: `MeshPhysicalMaterial` with `transmission 1`, `thickness ~0.7`, `ior 1.49`, `roughness ~0.05`, `clearcoat 1`, faint cool attenuation. Hole bevels must visibly refract.
- **Chrome**: `metalness 1`, `roughness ~0.12`, environment-lit. It is only convincing with a good environment map, so use a PMREM-filtered studio environment.
- **Satin cap / enamel discs**: clearcoat 0.6, roughness 0.5.
- **Light**: one soft key (top-left, shadows on, PCF soft), the environment for reflections, a faint fill. ACES filmic tone mapping, sRGB output.
- **Grounding**: a transparent shadow-catcher behind the dial so it sits on a white page with a soft contact shadow.
- **Camera**: ~28° FOV, a few degrees off-axis so you see thickness, with slight pointer parallax (≤ 2°) when not dragging.

## 4. The interaction model (how the real dial works)

1. **Grab a hole.** Pointer down must land inside a hole (radius × 1.2). Anywhere else does nothing. Cursor is `grab` over holes, `grabbing` while dragging.
2. **Pull clockwise only.** The plate follows the pointer's *angle around the dial centre* (accumulate the angle delta each frame so pulls beyond 180° do not wrap). It can never go below 0° and **can never go past the stop**: clamp to `R(d)`.
3. **The stop is hard.** On first reaching `R(d)`, fire the impact (see §6) and hold there. The plate does not keep turning under the finger.
4. **Release returns it by itself.** The plate is spring-loaded and driven back through the **governor**, which makes the return run at an almost **constant speed**, ≈ **320°/s** (about 10 pulses per second). It does not ease in and out like a UI transition.
5. **Digit = pulses counted on the way back.** One pulse for each 30° the plate passes while returning, at thresholds `22 + 30·k`. So the pulls are honest:
   - pulled to the stop → `n` pulses → digit `n` (10 pulses = 0)
   - released early → fewer pulses → a **lower digit**, as on a real dial
   - barely moved (< 22°) → 0 pulses → **no digit**
6. **Locked while returning.** Input is ignored until the plate is home.
7. **Tap / click / keyboard** perform a scripted pull of that digit (needed for touch and accessibility). Same physics, same sounds, finger speed instead of pointer speed.

## 5. Motion physics (numbers to start from; tune by feel)

- **Following the finger (pull)**: critically-ish damped spring on angle, `k ≈ 900`, damping ratio ≈ 0.85. The plate lags the pointer by roughly a frame or two and has weight. It must not snap.
- **Stop impact**: velocity into the stop is killed in one step. Add a **0.3–0.5° micro-compression rebound** and a **≤ 0.03 world-unit camera shake** that decays at `exp(-18·dt)`.
- **Release**: no instant jump. Return speed ramps `0 → 320°/s` over ~90 ms (`smoothstep`), then holds constant. This is the "spring lets go, governor takes over" moment.
- **Arrival home**: the plate hits its rest at speed, **overshoots ~0.5–0.8°**, and settles through an underdamped spring (`k ≈ 1400`, ζ ≈ 0.35). The rest is a small, crisp clack, not a glide.
- **Scripted pull (tap/keys)**: duration `0.38 + R/360 · 0.5` s, ease-in-out-cubic, ~90 ms **hold at the stop** before release.
- Integrate with a clamped timestep (`dt ≤ 1/30`) so a dropped frame never explodes the spring.

### The 12 principles, applied

| Principle | Where it appears |
|---|---|
| Squash & stretch | Micro-compression at the stop; overshoot on arrival |
| Anticipation | Slight resistance as the pull begins; the 90 ms hold before release |
| Staging | One clear action at a time; the number display updates only when the plate is home |
| Straight-ahead / pose-to-pose | Physics-driven pull and return; keyed timeline for scripted pulls |
| Follow-through & overlapping action | Plate rims and refraction keep moving a beat after the plate; camera shake settles later than the plate |
| Slow in / slow out | Used for the *human* pull only. The governor return is deliberately linear |
| Arcs | Everything rotates on one true arc about the dial centre |
| Secondary action | Pulse ticks, whir, camera tremor, light sliding across the bevels |
| Timing | 30° per pulse = 94 ms per pulse at 320°/s. Keep that rhythm exact |
| Exaggeration | Very light: a touch of overshoot and camera shake only |
| Solid drawing | Real thickness, bevels, refraction; parallax confirms it is 3D |
| Appeal | Calm, clean, tactile; the object does the talking |

## 6. Sound (WebAudio, synthesised, no files)

Unlock the audio context on the first pointer gesture. Provide a mute toggle.

- **Pull ratchet**: a soft, short, high tick every 15° of pull.
- **Stop thunk**: sine ~120 → 45 Hz over ~140 ms plus a low noise burst; gain scales with arrival speed.
- **Return whir**: low band-passed noise whose gain follows the return speed (the governor buzz), fading when it ends.
- **Pulse tick**: a bright, short click (band-passed noise ~3 kHz + tiny sine), one **per pulse threshold crossed**, so the digit can be *heard* being counted.
- **Rest clack**: one crisp, slightly lower click on arrival.
- Randomise pitch ±10 % so it never sounds machine-gunned.
- Haptics where available: `navigator.vibrate(4)` on pulse ticks.

## 7. States and edge cases

`idle → drag → return → settle → idle`, plus `auto` (scripted pull) feeding `return`.

- Pointer leaves the window, capture lost, or pointer cancel → treat as release.
- Pull but release before 22° → returns with no digit, a quiet rest.
- A tap shorter than ~250 ms and < 4° travel → scripted pull (a tap is a "dial it for me").
- Resize and DPR changes keep the aspect and sharpness. Cap DPR at 2.
- `prefers-reduced-motion`: keep the physics but shorten the scripted pull and drop the camera shake.

## 8. Accessibility and output

- The canvas has an `aria-label`; digit keys 0–9 dial; Backspace clears; a visible number readout under the canvas uses `aria-live`.
- Emit a `dialed` event with `{digit, sequence}` so the asset can be dropped into the portfolio and wired to the "C·A·S·E" case-study unlock later.

## 9. Acceptance checklist (all must pass)

- [ ] Ten bevelled, refracting holes in clear acrylic; numerals visible through them and **upright**
- [ ] Centre cap, bezel and finger stop are **fixed**; only the plate rotates
- [ ] Pull is clockwise-only and stops dead at the finger stop at the correct angle for every digit
- [ ] Released at the stop → returns at near-constant speed with exactly `n` audible pulses → digit `n` (0 = 10)
- [ ] Released early → a lower digit; barely moved → nothing
- [ ] Impact has thunk, micro-rebound and a faint camera shake
- [ ] Arrival has a short overshoot and a clack
- [ ] Input is locked during return; no double-dial
- [ ] Soft shadows, chrome reflections, plausible acrylic refraction
- [ ] Works with mouse, touch and keyboard; mute works; 60 fps on a laptop
