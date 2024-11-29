import SideBar from '@/components/dashboard/shared/sideBar';

export default function DashBoardLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex space-x-4 space-y-4">
            <SideBar></SideBar>
            {children}
        </div>
    );
}
