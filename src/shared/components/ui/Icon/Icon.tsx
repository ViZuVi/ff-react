import { icons, type IconName } from ".";

type Props = {
    name: IconName;
    size?: number;
    className?: string;
};

export const Icon = ({ name, size = 24, className }: Props) => {
    const SvgIcon = icons[name];

    if (!SvgIcon) {
        return <span style={{ width: size, height: size }} />;
    }

    return <SvgIcon width={size} height={size} className={className} />;
};