import {useRef, useEffect} from "react";
import * as d3 from "d3";

export default function Map(props){
    const width = props.width;
    const height = props.height;
    const padding = props.padding;
    const dataSet = props.data["monthlyVariance"];
    const root = useRef("#letter");
    const legend = useRef("#legend");
    const t = useRef("#tooltip");
    const win = useRef("#window")
    const years = dataSet.map(d => new Date(d["year"],1,0,0,0).getFullYear())
    const month = dataSet.map(d => new Date(1900,d["month"],15,1,0,0))
    const variance = dataSet.map(d => 8.66 + d["variance"]);
    const dataLeg = [2,3,4,5,6,7,8,9,10,11,12,13]
    console.log(dataSet);
    console.log(d3.min(month),d3.max(month));
  
    const x = d3.scaleTime([d3.min(years),d3.max(years)],[padding,width-padding]);
    const y = d3.scaleBand([0,1,2,3,4,5,6,7,8,9,10,11],[padding,height-padding*3])
    const color = d3.scaleSequential([d3.min(variance),d3.max(variance)], d3.interpolatePuOr );
    const leg = d3.scaleLinear([d3.min(variance),d3.max(variance)],[width/3,width - width/3])

    const tooltip = function(event){d3.select(win.current)
      .append("div")
      .attr("id","tooltip")
      .attr("data-year",this.getAttribute("data-year"))
      .style("position","absolute")
      .style("top", event.clientY - height/7 + "px")
      .style("left", event.clientX + "px")
      .style("width",width/7+"px")
      .style("height",height/7+"px")
      .style("background","var(--background2")
      .html("Year:"+this.getAttribute("data-year") +"<br>"+ "Month:" + (this.getAttribute("data-month")) + "<br>" + "Temperature:" + (this.getAttribute("data-temp")) + "<br>" + (this.getAttribute("data-var")))
} 

    useEffect(() => void d3.select(root.current)
                           .selectAll("rect")
                           .data(dataSet)
                           .enter()
                           .append("rect")
                           .attr("class","cell")
                           .attr("width","10px")
                           .attr("height",(height - padding*4)/12 + "px")
                           .attr("x",d => x(d["year"]))
                           .attr("y",d => y(d["month"]-1))
                           .attr("data-month",d => d["month"]-1)
                           .attr("data-year",d => d["year"])
                           .attr("data-temp",d => 8.66 + d["variance"])
                           .attr("data-var",d => d["variance"])
                           .attr("fill",d => color(8.66 + d["variance"]))
                           .on("mouseover",tooltip)
                           .on("mouseout",function(){
                            d3.select(t.current)
                            .remove()
                          })

    )

   useEffect(() => void d3.select(root.current)
                           .append("g")
                           .attr("transform", "translate(0," + (height - padding*3) + ")")
                           .call(d3.axisBottom(x).tickFormat(d3.format('d')))
                           .attr("id","x-axis")
    )

    useEffect(() => void d3.select(root.current)
                           .append("g")
                           .attr("transform", "translate("+ props.padding + "," + 0 + ")")
                           .call(d3.axisLeft(y).tickFormat(function(tick){
                            let date = new Date(1900,tick,15,15,0,0)
                            let format = d3.utcFormat("%B")
                            return format(date)
                           }))
                           .attr("id","y-axis")
    )
   
    useEffect(() => void d3.select(root.current)
                           .append("g")
                           .attr("transform", "translate(0," + (height - padding) + ")")
                           .call(d3.axisBottom(leg))
                           .attr("id","legend-line")
    )

    useEffect(() => void d3.select(legend.current)
                           .selectAll("rect")
                           .data(dataLeg)
                           .enter()
                           .append("rect")
                           .attr("width",(width/3)/12.4 +"px")
                           .attr("height","30px")
                           .attr("fill",d => color(d))
                           .attr("x",d => leg(d))
                           .attr("y",height - padding - 30)
                           
  )
   useEffect(() => void d3.select(root.current) 
   .append("rect")
   .attr("width",width +"px")
   .attr("height",height+"px")
   .attr("stroke","var(--color3)")
   .attr("fill","none")
   )
    return (
      <div id ="window">
        <svg 
        id ="letter"
        width = {width}
        height = {height}
        >
          <g id ="legend"></g>
        </svg>
      </div>
      
    )
  }