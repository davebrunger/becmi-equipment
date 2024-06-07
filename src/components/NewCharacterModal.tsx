import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";

interface Props {
    readonly modal: boolean;
    readonly setModal: (modal: boolean) => void;
}

export function NewCharacterModal(props : Props) {
    return (
        <Modal isOpen={props.modal} backdrop="static">
            <ModalHeader>Create a New Character</ModalHeader>
            <ModalBody>
                <Form>
                </Form>
            </ModalBody>
        </Modal>
    );
}