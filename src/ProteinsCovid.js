import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";

const ProteinsCovid = ({ data, width }) => {
  let layerRef = useRef();

  useEffect(() => {
    let svg = d3.select(layerRef.current);

    console.log(width)

    svg.selectAll("g").remove();

    let x = d3
      .scaleLinear()
      .domain([1, 29903])
      .range([0, width - 150]);

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => {
        return x(+d.start);
      })
      .attr("width", d => {
        return x(d.end) - x(d.start)
      })
      .attr("y", 0)
      .attr("fill", "lightgrey")
      .attr("stroke", "black")
      .attr("height", 40)
      .attr("data-for", () => {
        // if (!tooltip) {
        //   return null;
        // }

        return "svgTooltip";
      })
      .attr("data-tip", d => {
        //{position: 1, coverage: 44625, count: 28.06}

        // if (!tooltip) {
        //   return null;
        // }

        return (
          "Gene: " + d.gene + " Product: " + d.product
        );
      });

      ReactTooltip.rebuild();

  }, [data, width]);

  return (
    <>
      <g ref={layerRef} />
      {/* <rect width={100} height={100}></rect> */}
    </>
  );
};

export default ProteinsCovid;
