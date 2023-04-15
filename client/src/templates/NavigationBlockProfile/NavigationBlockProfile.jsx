import React from 'react'

import './NavigationBlockProfile.scss'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaQuestion, FaQuoteRight } from 'react-icons/fa'
import { IoMdDocument } from 'react-icons/io'
import { BASKET_ROUTE, LIKES_ROUTER, NOTIFICATION_ROUTE, ORDERS_ROUTE, QUESTION_ROUTE, RULES_ROUTE } from '../../utils/consts'
import { AiOutlineMessage, AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineFavorite } from 'react-icons/md'

export default function NavigationBlockProfile() {
  return (
    <>
<Container className="navigation_block" fluid>
        <Container>
          <Row>
            <p className="navigation_block_title">
              <span className="red">Основные </span> разделы
            </p>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Link to={NOTIFICATION_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <AiOutlineMessage size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Уведомления</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={ORDERS_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <AiOutlineShopping size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Заказы</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={BASKET_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <AiOutlineShoppingCart size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Корзина</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={LIKES_ROUTER}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <MdOutlineFavorite size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Избранное</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={QUESTION_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <FaQuestion size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">FAQ</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={RULES_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <IoMdDocument size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Оферта</p>
                  </Row>
                </Card>
              </Link>
            </Col>


          </Row>
        </Container>
      </Container>
    </>
  )
}
