export default function StudentCard({ student }: any) {
    return (
        <div
            role="button"
            className="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        >
            <div className="mr-4 grid place-items-center">
                <img alt="candice" src={student.image} className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
            </div>
            <div>
                <h6 className="text-slate-800 font-medium">{student.name}</h6>
                <p className="text-slate-500 text-sm"> {student.academicLevel} Student </p>
            </div>
            <div className="ml-auto">
                <span className="text-sm"> Engaged in {student.nbreOfEngagedClasses} </span>
            </div>
        </div>
    );
}
