import type { ArchiveVolume, VolumeNumber } from "./types";

export const volumeMap: Record<VolumeNumber, ArchiveVolume> = {
  1: {
    number: 1,
    key: "foundations-of-sovereignty",
    title: "Foundations of Sovereignty",
    description:
      "Spiritual authority, disciplined identity, symbolic awareness, and the formation of the ritual mind.",
  },
  2: {
    number: 2,
    key: "the-architecture-of-ritual",
    title: "The Architecture of Ritual",
    description:
      "Tools, correspondences, repetition, altar work, and the disciplined construction of ritual practice.",
  },
  3: {
    number: 3,
    key: "the-ecology-of-prosperity",
    title: "The Ecology of Prosperity",
    description:
      "Cycles of opportunity, prosperity currents, sacred exchange, and the living ecosystem of wealth.",
  },
  4: {
    number: 4,
    key: "the-lineage-of-spirit",
    title: "The Lineage of Spirit",
    description:
      "Ancestral authority, remembrance, communion, spiritual allies, and the continuity of sacred lineage.",
  },
};

export function getVolumeByKey(volumeKey: string) {
  return Object.values(volumeMap).find((volume) => volume.key === volumeKey) ?? null;
}