import { style } from '@mui/system';
import { useWindowWidth } from '@react-hook/window-size';
import { Row, Col } from 'antd';
import React from 'react'
import AdminSideMenu from '../../../Components/AdminSideMenu/AdminSideMenu'
import { SimpleHeading } from '../../../Components/common/Heading';
import styles from "./index.module.less";
const AdminDashboard = ({children}) => {
  const isSmallScreen = useWindowWidth() < 768;
  return (
    <div className={styles.adminDashboard}>
     <div className={styles.adminMainDashboard}>
       <Row gutter={[24,24]}>
       <SimpleHeading heading={"WELCOME TO YOUR DASHBOARD"} size={18} weight={"bold"} margin={"20px 10px"}/>
       </Row>
       <Row gutter={[24,24]} className={styles.mainSectionRow}>
         <Col xs={0} sm={0} md={6} lg={6} xl={6} className={style.adminSideSection}>
           <AdminSideMenu/>
         </Col>
         <Col xs={24} sm={24} md={18} lg={18} xl={18} className={!isSmallScreen && styles.adminMainSection}>
         {children}
         </Col>
       </Row>

     </div>
     
    </div>
  )
}

export default AdminDashboard