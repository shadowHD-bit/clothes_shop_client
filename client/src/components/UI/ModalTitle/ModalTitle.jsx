import React from 'react'
import { Modal } from 'react-bootstrap'
import './ModalTitle.scss'

export default function ModalTitle({firstText, secondText}) {
  return (
    <>
        <Modal.Title id="contained-modal-title-vcenter">
            <span className='modal_title-black'>{firstText}</span>  <span className='modal_title-red'>{secondText}</span>
        </Modal.Title>
    </>
  )
}
