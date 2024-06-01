import {useRef, useEffect} from "react";
import * as d3 from "d3";

export default function Map(props){
    const width = props.width;
    const height = props.height;
    const padding = props.padding;
    const dataSet = props.data;
    const root = useRef();
    const windows = useRef();
    const t = useRef("#tooltip")
    console.log(dataSet)

    
  }