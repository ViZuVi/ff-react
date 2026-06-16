import { Skeleton } from "@mui/material"

export const FiltersSkeleton = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 360 }}>
            <Skeleton animation="wave" variant="text"  />
            <Skeleton animation="wave" variant="text"  />
            <Skeleton animation="wave" variant="text"  />
            <Skeleton animation="wave" variant="text"  />
            <Skeleton animation="wave" variant="text"  />
            <Skeleton animation="wave" variant="text"  />
        </div>
    )
}