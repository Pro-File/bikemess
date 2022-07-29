import React from 'react';
import style from "./index.module.less";
import ListItem from './ListItem';

const List = ({data}) => {
  return (
    <div>
       {
           data.map((item) => {
               return <ListItem item={item}/>
           })
       }
    </div>
  )
}

export default List