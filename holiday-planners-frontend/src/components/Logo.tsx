export default function Logo() {
  return (
    <>
      <svg className="nav-logo-svg" viewBox="0 0 52 66" aria-hidden="true">
        {/* ground shadow */}
        <ellipse cx="24" cy="62" rx="9" ry="2.6" fill="#000" opacity="0.18" />
        {/* dark pin */}
        <path
          d="M24 6C13 6 4 15 4 26c0 14 20 34 20 34s20-20 20-34C44 15 35 6 24 6Z"
          fill="#2b2b2b"
        />
        {/* gold inner swoosh */}
        <path
          d="M25 14c-8 2-12 10-9 18 2 5 5 8 8 13 4-6 9-11 9-19 0-7-3-11-8-12Z"
          fill="#c19a5b"
        />
        {/* white inner highlight */}
        <path
          d="M24 18c-4 2-6 7-4 12 1 3 3 5 4 7 2-4 5-8 5-13 0-3-2-5-5-6Z"
          fill="#fff"
          opacity="0.9"
        />
        {/* paper plane */}
        <path d="M32 9 50 1 41 20 37 13Z" fill="#c19a5b" />
        <path d="M37 13 50 1 32 9Z" fill="#8a6a30" opacity="0.5" />
      </svg>
      <span className="nav-logo-text">
        <b>H</b>oliday <b>P</b>lanners
      </span>
    </>
  );
}