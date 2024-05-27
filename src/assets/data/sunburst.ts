const data = {
  name: "Urban Resilience",
  children: [
    {
      name: "SOCIAL",
      children: [
        {
          name: "Basic Needs",
          children: [
            { name: "1.1 Safe & affordable housing", value: 4 },
            { name: "1.2 Adequate affordable energy supply", value: 4 },
            { name: "1.3 Inclusive access to safe drinking water", value: 4 },
            { name: "1.4 Effective sanitation", value: 4 },
          ],
        },
        {
          name: "Labor & livelihood",
          children: [
            {
              name: "1.5 Sufficient affordable food supply",
              children: [{ name: "2.1 Inclusive labour policies", value: 5 }],
            },
          ],
        },
        {
          name: "Health & Safety",
          children: [
            { name: "2.2 Relevant skills & training", value: 5 },
            { name: "3.1 Robust public health systems", value: 5 },
            { name: "3.2 Adequate access to quality healthcare", value: 5 },
            {
              name: "3.3 Emergency medical care",
              children: [
                { name: "5.1 Effective systems to deter crime", value: 4 },
                { name: "5.2 Proactive corruption prevention ", value: 4 },
                { name: "5.3 Competent policing", value: 4 },
                { name: "5.4 Accessible criminal & civil justice", value: 4 },
                {
                  name: "11.2 Widespread community awareness & preparedness",
                  value: 5,
                },
              ],
            },
            { name: "11.1 Adequate education for all", value: 5 },
          ],
        },
        {
          name: "Community Engagement",
          children: [
            {
              name: "11.3 Effective mechanisms for communities to engage with government",
              value: 8,
            },
            { name: "4.1 Local community support", value: 4 },
            { name: "4.2 Cohesive communities", value: 4 },
            { name: "4.4 Actively engaged citizens", value: 4 },
          ],
        },
      ],
    },
    {
      name: "ECO-\nNOMIC",
      children: [
        {
          name: "Bussiness sector",
          children: [
            { name: "2.3 Local business development & innovation", value: 5 },
            { name: "2.4 Supportive financing mechanisms", value: 5 },
            {
              name: "6.2 Comprehensive business continuity planning",
              value: 5,
            },
          ],
        },
        {
          name: "Diversity & Equality",
          children: [{ name: "6.3 Diverse economic base", value: 6 }],
        },
        {
          name: "Economic Vitality",
          children: [
            {
              name: "6.4 Attractive business environment",
              children: [
                {
                  name: "6.5 Strong integration with regional & global economies",
                  value: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "INSTI-\nTUTIONAL",
      children: [
        {
          name: "Governance & Regulation",
          children: [
            { name: "10.1 Appropriate government decision-making", value: 6 },
            {
              name: "10.4 Comprehensive hazard monitoring and risk assessment",
              value: 6,
            },
          ],
        },
        {
          name: "Community Planning & Management",
          children: [
            {
              name: "10.5 Comprehensive government emergency management",
              children: [
                { name: "12.2 Consultative planning process", value: 6 },
              ],
            },
            { name: "12.3 Appropriate land use & zoning", value: 6 },
          ],
        },
        {
          name: "Public Finance & Support",
          children: [
            {
              name: "12.4 Robust planning approval process",
              children: [
                { name: "6.1 Well-managed public finances ", value: 6 },
                { name: "4.3 Strong city-wide identity & culture", value: 6 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "PHYSICAL",
      children: [
        {
          name: "Infrastructure Resilience",
          children: [
            {
              name: "8.5 Adequate continuity for critical assets & services",
              value: 5,
            },
            { name: "7.4 Robust protective infrastructure", value: 5 },
            {
              name: "3.4 Effective emergency response services",
              children: [
                {
                  name: "7.3 Effectively managed protective ecosystems",
                  value: 5,
                },
              ],
            },
          ],
        },
        {
          name: "Transport & Communitations",
          children: [
            { name: "9.4 Secure technology networks", value: 5 },
            { name: "9.3 Reliable communications technology", value: 5 },
            {
              name: "9.2 Effective transport operation & maintenance",
              value: 5,
            },
            {
              tooltip: { show: false },
              itemStyle: { opacity: 0, color: "transparent" },
              emphasis: { disabled: true },
              children: [
                {
                  name: "9.1 Diverse & affordable transport networks",
                  value: 5,
                },
              ],
            },
          ],
        },
        {
          name: "Data Management & Monitoring",
          children: [
            { name: "8.2 Flexible infrastructure services", value: 5 },
            {
              tooltip: { show: false },
              itemStyle: { opacity: 0, color: "transparent" },
              emphasis: { disabled: true },
              children: [
                { name: "8.1 Effective stewardship of ecosystems", value: 5 },
                {
                  name: "7.2 Appropriate codes, standards & enforcement",
                  value: 5,
                },
              ],
            },
            { name: "7.1 Comprehensive hazard & exposure mapping", value: 6 },
            {
              tooltip: { show: false },
              itemStyle: { opacity: 0, color: "transparent" },
              emphasis: { disabled: true },
              children: [
                {
                  name: "12.1 Comprehensive city monitoring & data management",
                  value: 5,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
export const mainOption = {
  backgroundColor: "#fff",
  tooltip: {
    show: true,
    formatter: function (params: any) {
      return `<div style="color: #000;font-size: 12px; padding:0;line-height: 12px">
                  <span style="display:inline-block;margin-right:5px;border-radius:50%;width:12px;height:12px;background-color:${[
                    params.color,
                  ]};"></span>
                  ${params.name.replace(/-\n/g, "")}
                </div>`;
    },
  },
  series: {
    type: "sunburst",
    data: data.children,
    radius: [0, "100%"],
    sort: null,
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2,
    },
    label: {
      fontFamily: "Arial",
      overflow: "break",
      fontSize: "0.7rem",
    },
    emphasis: {
      focus: "ancestor",
      itemStyle: {
        shadowBlur: 20,
        shadowColor: "rgba(0, 0, 0, 0.8)",
      },
    },
    selectedMode: "multiple",
    levels: [
      {},
      {
        r0: 20,
        r: 80,
        label: {
          rotate: "tangential",
        },
      },
      {
        r0: 80,
        r: 180,
        label: {
          align: "center",
          width: 100,
        },
      },
      {
        r0: 180,
        r: 330,
        label: {
          align: "center",
          width: 150,
          padding: 0,
          silent: false,
        },
        nodeClick: false,
        select: {
          itemStyle: {
            borderColor: "#5d5d5d",
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 5)",
          },
        },
      },
      {
        r0: 330,
        r: "100%",
        label: {
          width: 90,
          padding: 0,
          silent: false,
        },
        nodeClick: false,
        select: {
          itemStyle: {
            borderColor: "#5d5d5d",
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 5)",
          },
        },
      },
    ],
  },
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
