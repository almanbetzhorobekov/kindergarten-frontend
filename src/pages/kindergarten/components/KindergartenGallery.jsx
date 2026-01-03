import { Typography, Box } from "@mui/material";

const galleryItems = [
  {
    src: "/images/campus/Kindergarten-main.jpg",
    alt: "Kindergarten Gebäude",
    title: "Gebäude",
  },
  { src: "/images/campus/outside.jpg", alt: "outside", title: "Garten-1" },
  { src: "/images/campus/outside1.jpg", alt: "outside1", title: "Garten-2" },
  { src: "/images/campus/outside2.jpg", alt: "outside2", title: "Bäume" },
  { src: "/images/feast/Geburstag.jpeg", alt: "Feiern", title: "Geburtstage" },
  { src: "/images/feast/essen.jpg", alt: "Essen", title: "Unsere Kleinen" },
  {
    src: "/images/educator/beautiful-t.jpg",
    alt: "Erzieherin",
    title: "Top Erzieherin",
  },
  {
    src: "/images/educator/our-educator.jpg",
    alt: "Erzieher",
    title: "Maria Magdalena",
  },
  {
    src: "/images/educator/our-educator1.jpg",
    alt: "Erzieher1",
    title: "Bastelzeit",
  },
];

export default function KindergartenGallery() {
  return (
    <Box component={"section"}>
      {galleryItems.map((item, index) => (
        <Box key={index}>
          <img src={item.src} alt={item.alt} />
          <Typography>{item.title}</Typography>
          <Box></Box>
        </Box>
      ))}
    </Box>
  );
}
