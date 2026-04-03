interface SectionTransitionProps {
  fromColor: string;
  toColor: string;
  /** Use "subtle" for same/very-similar backgrounds — renders only a faint 1px line */
  variant?: 'full' | 'subtle';
}

const ACCENT = 'rgba(212, 168, 83, 0.4)';
const NEAR_BLACK = '#0A0A0A';

const SectionTransition = ({ fromColor, toColor, variant = 'full' }: SectionTransitionProps) => {
  if (variant === 'subtle') {
    return (
      <div
        aria-hidden="true"
        style={{
          height: 1,
          background: `linear-gradient(to right, transparent 5%, rgba(212,168,83,0.12) 50%, transparent 95%)`,
        }}
      />
    );
  }

  return (
    <div aria-hidden="true" style={{ position: 'relative', zIndex: 5 }}>
      {/* Top zone: section exit fades to near-black */}
      <div
        style={{
          height: 70,
          background: `linear-gradient(to bottom, ${fromColor}, ${NEAR_BLACK})`,
        }}
      />
      {/* Accent stitch line */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(to right, transparent 5%, ${ACCENT} 50%, transparent 95%)`,
        }}
      />
      {/* Bottom zone: near-black fades into next section */}
      <div
        style={{
          height: 70,
          background: `linear-gradient(to bottom, ${NEAR_BLACK}, ${toColor})`,
        }}
      />
    </div>
  );
};

export default SectionTransition;
