import { Col, Row,Breadcrumb,DatePicker, Space, Table, Spin } from 'antd';
import axios from "axios";
import { HomeFilled } from '@ant-design/icons';
import './index.scss';
import NavBar from './components/navBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChartBar, faDownload, faPrint, faChevronDown, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

library.add(fab, faChartBar)


const api = "https://wegivmerchantapp.firebaseapp.com/exam/bi-member-day-2020-04-01.json"


const columns = [
  {
    title: 'Name',
    dataIndex: 'customername',
    key: 'customername',
    
  },
  {
    title: 'ID',
    dataIndex: 'customerphone',
    key: 'customerphone',
    align: 'center',
   
  },
  {
    title: 'Tier',
    dataIndex: 'customertier',
    key: 'customertier',
    width: 100,
    align: 'center',
  },
  {
    title: 'LTV',
    dataIndex: 'totalamount',
    key: 'totalamount',
    align: 'right',
  },
  {
    title: 'Total Trans',
    dataIndex: 'totaltransaction',
    key: 'totaltransaction',
    align: 'right',
  },
  {
    title: 'Total Point',
    dataIndex: 'totalreward',
    key: 'totalreward',
    align: 'right',
  },
  {
    title: 'Remaining Point',
    dataIndex: 'remainingpoint',
    key: 'remainingpoint',
    align: 'right',
  },
];

const App = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [sumtier, setSumTier] = useState()
  const yearFormat = 'YYYY';

  const allData = async () => {
    try {
      const res = await axios.get(api);
      setData(res.data.data);
      const {summarytier} = res.data.data;
      for(let i in summarytier){
        setSumTier(summarytier[i])
      }
      if (res) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  
  return (
    <>
      <NavBar />
      <Spin spinning={loading} tip="Loading...">
        <div className='container'>
          <Row justify='space-between' align='middle'>
            <Col span={12} >
              <Breadcrumb>
                <Breadcrumb.Item>
                  <HomeFilled />
                </Breadcrumb.Item>
                <Breadcrumb.Item>Business Insight</Breadcrumb.Item>
                <Breadcrumb.Item>Report</Breadcrumb.Item>
                <Breadcrumb.Item>Member</Breadcrumb.Item>
                <Breadcrumb.Item>Member</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={12}  className='align-end'>
              <div className='circle-box'><FontAwesomeIcon icon={faChartBar} /></div>
              <div className='circle-box'><FontAwesomeIcon icon={faDownload} /></div>
              <div className='circle-box'><FontAwesomeIcon icon={faPrint} /></div>
            </Col>
          </Row>
          <Row justify='space-between' align='middle' className='mt-1'>
            <Col span={12} className='text title'>Yearly Member <span className='font-normal'>01-Jan-2020 to 31-Dec-2020</span></Col>
            <Col span={12} className='align-end'>
              <DatePicker className='year-picker' placeholder='Year View' format={yearFormat} picker="year" suffixIcon={<><FontAwesomeIcon icon={faChevronDown} /></>} allowClear/>
              <div className='rec-box'>2020</div>
              <div className='rec-box i-calendar'><FontAwesomeIcon icon={faCalendar} /></div>
            </Col>
          </Row>
          <Row className='sum-tier'>
            <Col span={8} className='sum-tier orange'>
            <Space direction="vertical" style={{width: '100%', gap: 40}}>
              <Row justify='space-between' >
                <Col>Total <span className='text big'>Members</span> :</Col>
                <Col className='text big'>{sumtier?.total_members}</Col>
              </Row>
              <Row justify='space-between' >
                <Col>Total <span className='text big'>Rev.</span><span className='text small'>(THB)</span> :</Col>
                <Col className='text big'>{Math.floor( sumtier?.total_amount/1000)}K</Col>
              </Row>
            </Space>
            </Col>
            <Col span={16} className='sum-tier gray'>
              <Row justify='center'><Col span={24} className='text big text-center'>{sumtier?.tier_name}</Col></Row>
              <Row justify='space-between'>
                <Col>Total <span className='text big'>Members</span> :</Col>
                <Col className='text big'>{sumtier?.total_members}</Col>
              </Row>
              <Row justify='space-between'>
                <Col>Total <span className='text big'>Rev.</span><span className='text small'>(THB)</span> :</Col>
                <Col className='text big'>{Math.floor( sumtier?.total_amount/1000)}K</Col>
              </Row>
            </Col>
          </Row>
          <Table 
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-gray' :  'table-row-white'}
            columns={columns} 
            dataSource={data.list} 
            bordered  
            pagination={{ pageSize: data?.total }}
            scroll={{ y: 240 }} />
      </div>
      <div className='sum-all'> 
          <Row>
            <Col span={7}>Total</Col>
            <Col span={6} className='align-end' >{data.summary?.lifetimevalue}</Col>
            <Col span={4} className='align-end'>{data.summary?.totaltransaction}</Col>
            <Col span={3} className='align-end'>{data.summary?.totalpoint}</Col>
            <Col span={3} className='align-end'>{data.summary?.lifetimevalue}</Col>
          </Row>
        </div>
      </Spin>
    </>
  );
}

export default App;
