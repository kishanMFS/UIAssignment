

// import { useState } from 'react';
import type React from 'react';
// import InputText from '../InputText';
import '../../styles/modal.css'

interface ModalType { 
    modalOpen: boolean,
    setModalOpen: (open: boolean) => void,
    title: string,
    children: React.ReactNode,
    footer: React.ReactNode
}

function Modal( { modalOpen, setModalOpen, title="default modal title", children, footer }: ModalType ) {
    
    function handleOnClose() {
        setModalOpen(false);
    }

    return (
        <div>
            {
                modalOpen && 
                (
                    <div className="modal-container">
                        <div className="modal-overlay"></div>
                        <div className="modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2>{title}</h2>
                                    <div className="close-btn" onClick={handleOnClose}>
                                        &times;
                                    </div>
                                </div>
                                <div className="modal-body">
                                    {children}
                                    
                                </div>
                                <div className="modal-footer">
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Modal