import Levels from "@/components/vanco/levels";
export default function Vancomycin({ ke, halfLife, vancoCl, vd, weight }) {
  return (
    <Levels
      ke={ke}
      halfLife={halfLife}
      vancoCl={vancoCl}
      vd={vd}
      weight={weight}
    />
  );
}
