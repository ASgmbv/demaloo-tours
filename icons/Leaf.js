import * as React from "react";
import { Box } from "@chakra-ui/core";

function SvgComponent(props) {
  return (
    <Box as="svg" viewBox="0 0 355 455" height={455} width={355} {...props}>
      <title>{"Autumn Leaf 5"}</title>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          y2={955.282}
          x2={-123.074}
          y1={886.696}
          x1={-242.225}
          id="prefix__b"
          xlinkHref="#prefix__a"
        />
        <linearGradient id="prefix__a">
          <stop offset={0} stopColor="#e56f1a" />
          <stop offset={1} stopColor="#e1d06c" />
        </linearGradient>
        <filter
          height={1}
          width={1}
          x={0}
          y={0}
          id="prefix__c"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur result="result8" stdDeviation={0.01} />
          <feTurbulence
            seed={3}
            result="result7"
            numOctaves={5}
            baseFrequency="0.025 0.028"
          />
          <feColorMatrix
            result="result5"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 6 -2.4"
          />
          <feComposite
            result="result6"
            in="result8"
            operator="in"
            in2="result7"
          />
          <feDisplacementMap
            in="result5"
            xChannelSelector="R"
            scale={75}
            result="result4"
            in2="result6"
          />
          <feFlood result="result10" floodOpacity={1} floodColor="#E8791F" />
          <feComposite result="result2" operator="in" in2="result4" />
          <feComposite
            result="result9"
            in="result2"
            operator="in"
            in2="result8"
          />
          <feBlend result="result11" in2="result8" />
        </filter>
      </defs>
      <g transform="matrix(2.7514 0 0 2.67954 -484.304 -2228.827)">
        <title>{"Autumn Leaf 5 -- by Arvin61r58"}</title>
        <path
          style={{
            lineHeight: "normal",
            textIndent: 0,
            textAlign: "start",
            textDecorationLine: "none",
            textDecorationStyle: "solid",
            textDecorationColor: "#000",
            textTransform: "none",
            blockProgression: "tb",
            whiteSpace: "normal",
            isolation: "auto",
            mixBlendMode: "normal",
            solidColor: "#000",
            solidOpacity: 1,
          }}
          d="M241.187 940.621l-1.418.38c2.153 16.047-6.237 40.285-18.775 52.927 2.07-.571 2.757.241 2.422 2.075 13.137-13.246 20.043-38.458 17.771-55.382z"
          color="#000"
          fontWeight={400}
          fontFamily="sans-serif"
          overflow="visible"
          fill="#005100"
          fillRule="evenodd"
          enableBackground="accumulate"
        />
        <path
          d="M-207.609 1018.597l.797-23.31c-12.364-9.185-26.843-13.082-46.29-4.556-24.092-31.483-5.247-17.204-24.092-31.483 17.19-.19 33.105-1.658 39.776-12.368.486-16.061-9.774-29.052-34.166-38.004l22.127-4.735-8.028-19.494-7.892-36.877 23.898 17.061 17.19-14.284 19.551 23.776 14.945 11.265 1.528-51.428 13.431 8.696 2.576-28.512 13.192-25.27h-.013l16.826 24.524-1.059 23.287 13.431 1.007 1.529 47.696c7.858 8.963 13.255.233 19.306-3.8l15.189-31.241 19.37 7.567 21.719-10.344-18.069 36.877 2.149 19.494 22.126 4.735c-19.737 13.732-26.001 30.825-34.165 38.004 6.67 10.71 22.584 12.178 39.776 12.368-18.846 14.279 0 0-24.092 31.483-19.448-8.526-33.927-4.629-46.29 4.556l.796 23.31c-19.53-.522-48.536-19.257-48.536-19.257s-29.005 18.735-48.536 19.257z"
          transform="matrix(.5 0 0 .5 320.07 442.856)"
          opacity={0.99}
          fill="url(#prefix__b)"
          fillRule="evenodd"
          filter="url(#prefix__c)"
        />
        <g
          fill="none"
          stroke="#924100"
          strokeWidth={0.546}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeOpacity={0.196}
        >
          <path
            d="M240.975 942.276c-22.322-20.815-32.076-14.022-47.213-15.426M287.953 926.85c-15.138 1.404-24.891-5.39-47.213 15.308l.235-98.048M230.69 934.329c-1.377 7.46-5.356 10.24-9.816 12.154M253.825 932.926c1.378 7.46 5.357 10.24 9.817 12.154"
            opacity={0.99}
          />
          <path
            d="M282.34 882.908c-25.127 6.318-31.7 34.046-41.835 58.082-10.135-24.27-16.707-51.998-41.835-58.315M226.25 907.917c-19.074-1.379-22.14-6.018-28.515-9.816M255 907.45c19.074-1.38 22.14-6.019 28.515-9.817"
            opacity={0.99}
          />
        </g>
      </g>
    </Box>
  );
}

export default SvgComponent;
