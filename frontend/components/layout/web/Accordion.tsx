interface AccordionProps {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
}

const Accordion = ({ title, content, isOpen, onToggle }: AccordionProps) => {
    return (
        <div className="bg-accordion border overflow-hidden border-accordion">
            <button
                className="w-full flex justify-between items-center p-4 hover:bg-gray-200 transition btn-accordion text-[13px] md:text-[16px] cursor-pointer"
                onClick={onToggle}
            >
                <span className="title-accordion">{title}</span>
                {isOpen ? (
                    <i className="fa-solid fa-chevron-up"></i>
                ) : (
                    <i className="fa-solid fa-chevron-down"></i>
                )}
            </button>

            <div
                className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-40 p-4" : "max-h-0 p-0"
                }`}
            >
                <p className="text-accordion text-[12px] md:text-[15px]">{content}</p>
            </div>
        </div>
    );
};

export default Accordion;
