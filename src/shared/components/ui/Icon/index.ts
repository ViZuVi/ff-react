const modules = import.meta.glob(
  "/src/assets/icons/*.svg",
  { eager: true, query: "?react", import: "default" }
);

// превращаем в удобный объект
export const icons = Object.fromEntries(
  Object.entries(modules).map(([path, component]) => {
    const name = path
      .split("/")
      .pop()!
      .replace(".svg", "");

    return [name, component];
  })
) as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

export type IconName = keyof typeof icons;