import { Col, Row,Avatar } from 'antd';
import { UserOutlined,HeartFilled } from '@ant-design/icons';
import logo from '../logo.png'
import './navBar.scss';

const NavBar = () => {
  return (
    <div className='navbar-container'>
    <Row className='navbar'  >
      <Col span={18} className='black'>
        <Row align='middle' justify='space-between'>
          <Col xs={12}  md={18} lg={20} >
            <img className='logo' src={logo} alt=''/>
          </Col>
          <Col xs={12}  md={6} lg={4} className='align-end pr-1'>
            <Row align='middle'  >
              <Col>
                <Avatar icon={<UserOutlined size="small" className='i-user'/>} />
              </Col>
              <Col className='text-user'>
                Mr.Admin
                <span className='pos'>Head Quarter</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={6} className='orange'>MENU <HeartFilled /></Col>
    </Row>
    </div>
  );
}

export default NavBar;
