'use client';

import { useCallback, useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);
    
    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);
  
    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
  
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);
  
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="fixed flex items-center justify-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full h-fullmd:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto lg:h-auto md:h-auto my-6">
                    <div 
                    className={`
                    h-full
                    translate
                    duration-300
                    ${showModal ? "opacity-100" : "opacity-0"}
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    `}>
                        <div className="relative flex flex-col translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg w-full bg-white outline-none focus:outline-none">
                            <div className="relative flex items-center justify-center p-6 rounded-t border-b-[1px]">
                                <button
                                onClick={handleClose}
                                className="absolute left-9 p-1 border-0 hover:opacity-70 transition">
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">{title}</div>
                            </div>
                            <div className="relative p-6 flex-auto">{body}</div>
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryActionLabel && secondaryAction && (
                                        <Button 
                                        outline 
                                        disabled={disabled} 
                                        label={secondaryActionLabel} 
                                        onClick={handleSecondaryAction} 
                                        />
                                    )}
                                    <Button 
                                    disabled={disabled} 
                                    label={actionLabel} 
                                    onClick={handleSubmit} 
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Modal;