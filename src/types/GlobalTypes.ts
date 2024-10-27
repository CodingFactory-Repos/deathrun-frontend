export interface InfoItemProps {
    label: string;
    description: string;
    image: string;
    value: number | string | undefined;
    alt: string;
    onHoverTrap: (info: any) => void;
}
