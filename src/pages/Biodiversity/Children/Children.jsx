// Protected Areas
import { text as protectedAreasText } from "./Texts/ProtectedAreas/text";
import protectedAreasBackground from "./Backgrounds/ProtectedAreas/background.webp";
// ForestArea
import { text as forestArea } from "./Texts/ForestArea/text";
import forestBackground from "./Backgrounds/ForestArea/background.webp";
// Forest and Field Fires
import { text as forestAndFieldFiresText } from "./Texts/ForestAndFieldFires/text";
import forestAndFieldFiresBackground from "./Backgrounds/ForestAndFieldFires/background.webp";

const Children = [
  {
    text: protectedAreasText,
    background: protectedAreasBackground,
    href: "biodiversity/protectedareas",
  },
  {
    text: forestArea,
    background: forestBackground,
    href: "biodiversity/forestarea",
  },
  {
    text: forestAndFieldFiresText,
    background: forestAndFieldFiresBackground,
    href: "biodiversity/forestandfieldfires",
  },
];

export default Children;
