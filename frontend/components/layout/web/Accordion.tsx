interface AccordionProps {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
}

const Accordion = ({ title, content, isOpen, onToggle }: AccordionProps) => {
    return (
        <div className={`bg-accordion border border-accordion flex flex-col justify-start transition-all ${isOpen ? 'h-full' : 'h-[fit-content]'}`}>
            <button
                className={`w-full flex justify-between items-center p-4 hover:bg-gray-200 transition btn-accordion text-[13px] md:text-[15px] cursor-pointer`}
                onClick={onToggle}
            >
                <span className="title-accordion text-start">{title}</span>
                <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>

            <div
                className={`transition-all duration-300 overflow-y-auto px-4 text-accordion text-[12px] md:text-[15px] ${isOpen ? 'max-h-[200px] py-2' : 'max-h-0 py-0'
                    }`}
            >
                <p>{content}</p>
            </div>
        </div>
    );
};

export default Accordion;
