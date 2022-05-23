import Levels from "@/components/vanco/levels";
export default function Vancomycin({ age, ke, halfLife, vancoCl, vd, weight }) {
  return (
    <Levels
      age={age}
      ke={ke}
      halfLife={halfLife}
      vancoCl={vancoCl}
      vd={vd}
      weight={weight}
    />
  );
}
