export default function ClasseCard({ classe }:any) {
    return (
        <div key={classe.id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img src={classe.imageSrc} alt={classe.imageAlt} className="w-full h-full object-center object-cover" />
            </div>
            <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                    <a href={classe.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {classe.name}
                    </a>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                    <p className="mt-1 text-sm text-gray-500">{classe.studentsCount} students</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">{classe.academicLevel}</p>
            </div>
        </div>
    );
}
