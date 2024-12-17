import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import {
  populationAccessibleColor,
  populationInaccessibleColor,
} from "../assets/ts/constants";

enum SANKEYLEVELS {
  LEVEL1 = 0,
  LEVEL2 = 0.5,
  LEVEL3 = 1.8,
  LEVEL4 = 2,
}
const useEchartsStore = defineStore("echarts-options", () => {
  const { t } = useI18n();
  const sunburstData = {
    name: computed(() => t("echarts.name")),
    children: [
      {
        name: computed(() => t("echarts.social.name")),
        children: [
          {
            name: t("echarts.social.1.name"),
            children: [
              {
                name: t("echarts.social.1.1"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.1.2"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.1.3"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.1.4"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.1.5"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: t("echarts.social.2.name"),
            children: [
              {
                name: t("echarts.social.2.1"),
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.2.2"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.2.3"),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: t("echarts.social.3.name"),
            children: [
              {
                name: t("echarts.social.3.1"),
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.3.2"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.3.3"),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.3.4"),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.3.5"),
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.3.6"),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.3.7"),
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: t("echarts.social.3.8"),
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Local community support",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Strong city-wide identity & culture",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Actively engaged citizens",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Practices and drills involving public and professionals",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Adequate education for all",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Major community buildings, religious buildings, and historic/cultural assets",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Relevant skills & training",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Ecosystem Services",
            children: [
              {
                name: "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
                children: [
                  {
                    value: 8,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Awareness of functions or services that natural capital provides for the city",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Planning Resilience",
            children: [
              {
                name: "Public education towards awareness of hazard, risk and disaster information",
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Safe places/havens and the evacuation routes",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
                children: [
                  {
                    value: 8,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Awareness of equipment and supply needed + provision",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Security services",
            children: [
              {
                name: "Effective systems to deter crime",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "High levels of crime are observed",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "ECO-\nNOMIC",
        children: [
          {
            name: "Economic activities",
            children: [
              {
                name: "Diverse economic base",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Industrial areas including ports, industrial zones, and factories",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Supportive financing mechanisms",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Economic Impact",
            children: [
              {
                name: "Businesses with a documented business continuity plan",
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Knowledge to funding opportunities (for local economy and recovery)",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Attractive business environment",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Economic impact",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Level of insurance cover exists in the city, across all sectors - business and community",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Incentives for business and society to support resilience building",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Planned investments",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Comprehensive business continuity planning",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Inclusive labour policies",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Local business development and innovation",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Strong integration with regional & global economies",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Planning Resilience",
            children: [
              {
                name: "Financial plan and budget for resilience, including contingency funds",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Projected changes to population densities and economic activity",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Densities",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Governance",
            children: [
              {
                name: "Changes in the overall city's boundaries",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
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
            name: "Governance",
            children: [
              {
                name: "Disaster management authority have sufficient staffing capacity",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Consultative planning process",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Informal development areas",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Robust planning approval process",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Well-managed public finances",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Appropriate government decision-making",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Effective co-ordination with other government bodies",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Proactive multi-stakeholder collaboration",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 8,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Urban development to promote resilience",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Building codes or standards address hazards and risks",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Enforcement and verification of zoning bulding zoning and regulations",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "FAIR Data sharing to enhance resilience",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Proactive corruption prevention",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Comprehensive city monitoring & data management",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Land use",
            children: [
              {
                name: "Land use designations",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Changes in land use designations",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Planning for risk and disaster",
            children: [
              {
                name: "Disaster and risk reduction in urban planning instruments according to Sendai framework",
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Vulnerability mapping and monitoring (vulnerable groups and assets, dissaster scenario analysis)",
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 10,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Early warning system and reaching level",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Comprehensive government emergency management",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Integration of resilience in city functions / portfolios",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Emergency operations centre: interoperability and inter-agency implementation and coordination",
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Disaster management / preparedness / emergency response plan",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Appropriate land use and zoning",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Appropriately land use planning considering risk, hazards and vulnerability",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Projected changes in location of vulnerable populations",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Public health systems",
            children: [
              {
                name: "Adequate access to quality healthcare",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Emergency medical care",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Effective emergency response services",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Robust public health systems",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Security services: fire services, police stations, etc.",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
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
            name: "Communication",
            children: [
              {
                name: "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Reliable communications technology",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Ecosystem Services",
            children: [
              {
                name: "Integration of green and blue infrastructure into city policy and projects",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Natural elements, mangrove, hills, rivers, plantations, among others",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Governance",
            children: [
              {
                name: "Secure technology networks",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Land Use",
            children: [
              {
                name: "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
                children: [
                  {
                    value: 10,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Major infrastructure",
            children: [
              {
                name: "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
                children: [
                  {
                    value: 8,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Critical infrastructure: mapping, planning and protection strategies",
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Infrastructure and services damaged",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Protective infrastructure: well-designed and well-built based on risk information",
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: 'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
                children: [
                  {
                    value: 9,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Major roads",
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Major Infrastructure & Planning Resilience",
            children: [
              {
                name: "Diligent maintenance & continuity",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Flexible infrastructure services",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Retained spare capacity",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Planning for risk and disaster",
            children: [
              {
                name: "Housing destroyed and damaged",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Affected areas",
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Topography: elevation, water bodies",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Hazard mapping and monitoring (common awareness)",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Hazard mapping and monitoring (clear and regular mapping)",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Identification of cascading effects",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 8,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Changes in intensity, frequency, and location of hazards based on hazard modeling",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: "Planning Resilience",
            children: [
              {
                name: '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Adequate continuity for critical assets & services",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Comprehensive hazard monitoring and risk assessment",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "First responder equipment, with military or civilian back up",
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Vulnerability and risk",
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: "Diverse and affordable transport networks",
                itemStyle: { opacity: 0.6 },
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const initialSunburstData = sunburstData.children.map((level1) => ({
    name: level1.name,
    children: level1.children.map((level2) => ({
      name: level2.name,
      value: 1,
    })),
  }));
  const sunburstDimension = new Set();
  sunburstData.children.forEach((level1: any) => {
    level1.children.forEach((level2: any) => {
      sunburstDimension.add(level2.name);
    });
  });
  const sunburstIndicator = new Set();
  sunburstData.children.forEach((level1: any) => {
    level1.children.forEach((level2: any) => {
      level2.children.forEach((level3: any) => {
        sunburstIndicator.add(level3.name);
      });
    });
  });
  const sunburstColorSet: Record<string, string> = {
    "rgba(172,216,151,1)": "SOCIAL",
    "rgba(251,213,129,1)": "ECO-\nNOMIC",
    "rgba(242,140,140,1)": "INSTI-\nTUTIONAL",
    "rgba(150,207,230,1)": "PHYSICAL",
  };
  const sunburstColorConvertion: Record<string, string> = {
    "rgba(172,216,151,1)": "#91CC75",
    "rgba(251,213,129,1)": "#FAC858",
    "rgba(242,140,140,1)": "#EE6666",
    "rgba(150,207,230,1)": "#73C0DE",
  };
  const color = [
    // "#5470C6", // blue
    "#91CC75", // green
    "#FAC858", // yellow
    "#EE6666", // red
    "#73C0DE", // light blue
    "#3BA272", // dark green
    "#FC8452", // orange
    "#9A60B4", // purple
    "#EA7CCC", // pink
  ];
  const sunburstOption = {
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
      confine: true,
    },
    series: {
      type: "sunburst",
      data: initialSunburstData,
      radius: [0, "100%"],
      sort: undefined,
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
      label: {
        fontFamily: "Arial",
        overflow: "break",
        fontSize: "1rem",
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
        {
          r0: 0,
          r: 50,
          itemStyle: {
            color: "white",
            opacity: 0.4,
          },
        },
        {
          r0: 50,
          r: 120,
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: 120,
          r: 425,
          label: {
            align: "center",
            width: 325,
          },
          nodeClick: false,
        },
      ],
    },
    color: color,
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  let level1Data: any[] = [];
  let level2Data: any[] = [];
  let sunburstOption1 = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: (params: any) => {
        return `<div style="color: #000;font-size: 12px; padding:0;line-height: 12px">
                  <span style="display:inline-block;margin-right:5px;border-radius:50%;width:12px;height:12px;background-color:${[
                    params.color,
                  ]};"></span>
                  ${params.name.replace(/-\n/g, "")}
                </div>`;
      },
      confine: true,
    },
    series: {
      type: "sunburst",
      data: level1Data,
      radius: [0, "100%"],
      sort: undefined,
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
        {
          itemStyle: {
            color: "white",
            opacity: 0.4,
          },
        },
        {
          r0: 20,
          r: 70,
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: 70,
          r: 170,
          label: {
            align: "center",
            width: 100,
          },
        },
        {
          r0: 170,
          r: 330,
          label: {
            align: "center",
            width: 160,
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
          r: 425,
          label: {
            width: 100,
            padding: 0,
            silent: false,
          },
          nodeClick: false,
        },
      ],
    },
    color: color,
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  let sunburstOption2 = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: (params: any) => {
        return `<div style="color: #000;font-size: 12px; padding:0;line-height: 12px">
                  <span style="display:inline-block;margin-right:5px;border-radius:50%;width:12px;height:12px;background-color:${[
                    params.color,
                  ]};"></span>
                  ${params.name.replace(/-\n/g, "")}
                </div>`;
      },
      confine: true,
    },
    series: {
      type: "sunburst",
      data: level2Data,
      radius: [0, "100%"],
      sort: undefined,
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
        {
          itemStyle: {
            color: "white",
            opacity: 0.4,
          },
        },
        {
          r0: 70,
          r: 170,
          label: { rotate: "tangential" },
        },
        {
          r0: 170,
          r: 330,
          label: {
            align: "center",
            width: 160,
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
          r: 425,
          label: {
            width: 100,
            padding: 0,
            silent: false,
          },
          nodeClick: false,
        },
      ],
    },
    color: color,
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  // Sankey Graph Options
  const sankeyOption = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: "{b}",
      confine: true,
    },
    series: {
      type: "sankey",
      layoutIterations: 40,
      layout: "none",
      emphasis: {
        focus: "adjacency",
      },
      left: 10,
      top: 25,
      right: 70,
      bottom: 25,
      lineStyle: {
        color: "gradient",
      },
      label: {
        fontSize: 9,
      },
      nodeWidth: 15,
      nodeGap: 12,
      selectedMode: "multiple",
      data: [
        { name: "Robustness", depth: SANKEYLEVELS.LEVEL4 },
        { name: "Redundancy", depth: SANKEYLEVELS.LEVEL4 },

        { name: "Diversity", depth: SANKEYLEVELS.LEVEL4 },
        { name: "Integration", depth: SANKEYLEVELS.LEVEL3 },
        { name: "Transparent", depth: SANKEYLEVELS.LEVEL3 },
        { name: "Resourcefulness", depth: SANKEYLEVELS.LEVEL4 },
        { name: "Inclusive", depth: SANKEYLEVELS.LEVEL3 },
        { name: "Reflective", depth: SANKEYLEVELS.LEVEL3 },
        { name: "Flexible", depth: SANKEYLEVELS.LEVEL3 },
        {
          name: computed(() => t("echarts.social.name")),
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL1,
        },
        {
          name: "Safe & affordable housing",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Inclusive access to safe drinking water",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Effective sanitation",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Adequate affordable energy supply",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Access to all the skills and experience to respond/reduce risks and respond to disaster",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Accessible criminal & civil justice",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Accessibility to training materials (language)",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Sufficient affordable food supply",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Exchange knowledge and learn from other cities facing similar challenges",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Grassroots or community organizations participating in pre-event planning and post event response",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Accessible criminal and civil justice",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Cohesive communities",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Training programmes provided to the most vulnerable and at need populations",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Citizen engagement and communications in relation to disaster resilience and recovery",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Widespread community awareness & preparedness",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Main public facilities: university, schools, health centres, markets, etc.",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Social services infrastructure, including schools, hospitals, and clinics",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Local community support",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Strong city-wide identity & culture",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Actively engaged citizens",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Practices and drills involving public and professionals",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Adequate education for all",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Major community buildings, religious buildings, and historic/cultural assets",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Relevant skills & training",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Awareness of functions or services that natural capital provides for the city",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Public education towards awareness of hazard, risk and disaster information",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Safe places/havens and the evacuation routes",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Awareness of equipment and supply needed + provision",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Effective systems to deter crime",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "High levels of crime are observed",
          itemStyle: { color: "#91CC75" },
          depth: SANKEYLEVELS.LEVEL2,
        },

        { name: "Economic", itemStyle: { color: "#FAC858" }, depth: SANKEYLEVELS.LEVEL1 },
        {
          name: "Diverse economic base",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Inclusive labour policies",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Local business development and innovation",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Supportive financing mechanisms",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Comprehensive business continuity planning",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Attractive business environment",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Strong integration with regional & global economies",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Industrial areas including ports, industrial zones, and factories",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Businesses with a documented business continuity plan",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Knowledge to funding opportunities (for local economy and recovery)",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Economic impact",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Level of insurance cover exists in the city, across all sectors - business and community",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Incentives for business and society to support resilience building",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Planned investments",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Changes in the overall city's boundaries",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Financial plan and budget for resilience, including contingency funds",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Densities",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Projected changes to population densities and economic activity",
          itemStyle: { color: "#FAC858" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Institutional",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL1,
        },
        {
          name: "Disaster management authority have sufficient staffing capacity",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Appropriate government decision-making",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Effective co-ordination with other government bodies",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Proactive multi-stakeholder collaboration",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Comprehensive government emergency management",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Consultative planning process",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Appropriate land use and zoning",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Robust planning approval process",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Well-managed public finances",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Informal development areas",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Urban development to promote resilience",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Building codes or standards address hazards and risks",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Enforcement and verification of zoning bulding zoning and regulations",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "FAIR Data sharing to enhance resilience",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Proactive corruption prevention",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Comprehensive city monitoring & data management",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Land use designations",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Changes in land use designations",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Disaster and risk reduction in urban planning instruments according to Sendai framework",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Vulnerability mapping and monitoring (vulnerable groups and assets, dissaster scenario analysis)",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Early warning system and reaching level",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Integration of resilience in city functions / portfolios",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Emergency operations centre: interoperability and inter-agency implementation and coordination",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Disaster management / preparedness / emergency response plan",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Appropriately land use planning considering risk, hazards and vulnerability",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Projected changes in location of vulnerable populations",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Adequate access to quality healthcare",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Emergency medical care",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Effective emergency response services",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Robust public health systems",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Security services: fire services, police stations, etc.",
          itemStyle: { color: "#EE6666" },
          depth: SANKEYLEVELS.LEVEL2,
        },

        { name: "Physical", itemStyle: { color: "#73C0DE" }, depth: SANKEYLEVELS.LEVEL1 },
        {
          name: "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Integration of green and blue infrastructure into city policy and projects",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Reliable communications technology",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Adequate continuity for critical assets & services",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Diverse and affordable transport networks",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Natural elements, mangrove, hills, rivers, plantations, among others",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Secure technology networks",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Flexible infrastructure services",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Critical infrastructure: mapping, planning and protection strategies",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Infrastructure and services damaged",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Protective infrastructure: well-designed and well-built based on risk information",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: 'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Major roads",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Diligent maintenance & continuity",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Retained spare capacity",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Housing destroyed and damaged",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Affected areas",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Topography: elevation, water bodies",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Hazard mapping and monitoring (common awareness)",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Hazard mapping and monitoring (clear and regular mapping)",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Identification of cascading effects",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Changes in intensity, frequency, and location of hazards based on hazard modeling",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Comprehensive hazard monitoring and risk assessment",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "First responder equipment, with military or civilian back up",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
        {
          name: "Vulnerability and risk",
          itemStyle: { color: "#73C0DE" },
          depth: SANKEYLEVELS.LEVEL2,
        },
      ],
      links: [
        {
          source: "Physical",
          target: "Natural elements, mangrove, hills, rivers, plantations, among others",
          value: 1,
        },
        {
          source: "Physical",
          target:
            "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
          value: 1,
        },
        {
          source: "Physical",
          target: "Adequate continuity for critical assets & services",
          value: 1,
        },
        {
          source: "Physical",
          target: "Diverse and affordable transport networks",
          value: 1,
        },
        {
          source: "Physical",
          target:
            "Integration of green and blue infrastructure into city policy and projects",
          value: 1,
        },
        {
          source: "Physical",
          target: "Reliable communications technology",
          value: 1,
        },
        {
          source: "Physical",
          target: "Secure technology networks",
          value: 1,
        },
        {
          source: "Physical",
          target: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
          value: 1,
        },
        {
          source: "Physical",
          target:
            "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
          value: 1,
        },
        {
          source: "Physical",
          target:
            "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
          value: 1,
        },
        {
          source: "Physical",
          target: "Flexible infrastructure services",
          value: 1,
        },
        {
          source: "Flexible infrastructure services",
          target: "Redundancy",
          value: 0.5,
        },
        {
          source: "Flexible infrastructure services",
          target: "Flexible",
          value: 0.5,
        },
        {
          source: "Physical",
          target:
            "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
          value: 1,
        },
        {
          source:
            "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
          target: "Robustness",
          value: 0.33,
        },
        {
          source:
            "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source:
            "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
          target: "Integration",
          value: 0.33,
        },
        {
          source: "Physical",
          target: "Critical infrastructure: mapping, planning and protection strategies",
          value: 1,
        },
        {
          source: "Critical infrastructure: mapping, planning and protection strategies",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Critical infrastructure: mapping, planning and protection strategies",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Physical",
          target: "Infrastructure and services damaged",
          value: 1,
        },
        {
          source: "Infrastructure and services damaged",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Physical",
          target:
            "Protective infrastructure: well-designed and well-built based on risk information",
          value: 1,
        },
        {
          source:
            "Protective infrastructure: well-designed and well-built based on risk information",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Physical",
          target:
            'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
          value: 1,
        },
        {
          source:
            'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
          target: "Redundancy",
          value: 0.5,
        },
        {
          source: "Physical",
          target: "Major roads",
          value: 1,
        },
        {
          source: "Major roads",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Physical",
          target:
            "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
          value: 1,
        },
        {
          source:
            "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Physical",
          target: "Diligent maintenance & continuity",
          value: 1,
        },
        {
          source: "Diligent maintenance & continuity",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Diligent maintenance & continuity",
          target: "Redundancy",
          value: 0.5,
        },
        {
          source: "Physical",
          target: "Retained spare capacity",
          value: 1,
        },
        {
          source: "Retained spare capacity",
          target: "Redundancy",
          value: 1,
        },
        {
          source: "Physical",
          target: "Housing destroyed and damaged",
          value: 1,
        },
        {
          source: "Housing destroyed and damaged",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Physical",
          target: "Affected areas",
          value: 1,
        },
        {
          source: "Affected areas",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Physical",
          target: "Topography: elevation, water bodies",
          value: 1,
        },
        // {
        //   source: "Topography: elevation, water bodies",
        //   target: "Transparent",
        //   value: 1,
        // },
        {
          source: "Physical",
          target: "Hazard mapping and monitoring (common awareness)",
          value: 1,
        },
        {
          source: "Hazard mapping and monitoring (common awareness)",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Hazard mapping and monitoring (common awareness)",
          target: "Reflective",
          value: 0.5,
        },
        {
          source: "Physical",
          target:
            "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
          value: 1,
        },
        {
          source:
            "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
          target: "Integration",
          value: 1,
        },
        {
          source: "Physical",
          target: "Hazard mapping and monitoring (clear and regular mapping)",
          value: 1,
        },
        {
          source: "Hazard mapping and monitoring (clear and regular mapping)",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Hazard mapping and monitoring (clear and regular mapping)",
          target: "Reflective",
          value: 0.5,
        },
        {
          source: "Physical",
          target:
            "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
          value: 1,
        },
        {
          source:
            "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Physical",
          target: "Identification of cascading effects",
          value: 1,
        },
        {
          source: "Identification of cascading effects",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Identification of cascading effects",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Physical",
          target:
            "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
          value: 1,
        },
        {
          source:
            "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
          target: "Robustness",
          value: 1,
        },
        {
          source:
            "Changes in intensity, frequency, and location of hazards based on hazard modeling",
          target: "Robustness",
          value: 0.25,
        },
        {
          source:
            "Changes in intensity, frequency, and location of hazards based on hazard modeling",
          target: "Integration",
          value: 0.25,
        },
        {
          source:
            "Changes in intensity, frequency, and location of hazards based on hazard modeling",
          target: "Reflective",
          value: 0.25,
        },
        {
          source:
            "Changes in intensity, frequency, and location of hazards based on hazard modeling",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Physical",
          target:
            "Changes in intensity, frequency, and location of hazards based on hazard modeling",
          value: 1,
        },
        {
          source:
            '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
          target: "Robustness",
          value: 1,
        },
        {
          source: "Physical",
          target:
            '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
          value: 1,
        },
        {
          source: "Comprehensive hazard monitoring and risk assessment",
          target: "Robustness",
          value: 0.33,
        },
        {
          source: "Comprehensive hazard monitoring and risk assessment",
          target: "Integration",
          value: 0.33,
        },
        {
          source: "Comprehensive hazard monitoring and risk assessment",
          target: "Reflective",
          value: 0.33,
        },
        {
          source: "Physical",
          target: "Comprehensive hazard monitoring and risk assessment",
          value: 1,
        },
        {
          source: "First responder equipment, with military or civilian back up",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "First responder equipment, with military or civilian back up",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source: "First responder equipment, with military or civilian back up",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source: "First responder equipment, with military or civilian back up",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Physical",
          target: "First responder equipment, with military or civilian back up",
          value: 1,
        },
        {
          source:
            "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
          target: "Robustness",
          value: 0.33,
        },
        {
          source:
            "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
          target: "Resourcefulness",
          value: 0.33,
        },
        {
          source:
            "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
          target: "Flexible",
          value: 0.33,
        },
        {
          source: "Physical",
          target:
            "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
          value: 1,
        },
        {
          source: "Vulnerability and risk",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Vulnerability and risk",
          target: "Integration",
          value: 0.25,
        },
        {
          source: "Vulnerability and risk",
          target: "Reflective",
          value: 0.25,
        },
        {
          source: "Physical",
          target: "Vulnerability and risk",
          value: 0.25,
        },
        {
          source:
            "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
          target: "Integration",
          value: 0.5,
        },
        {
          source:
            "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
          target: "Diversity",
          value: 1,
        },
        {
          source: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
          target: "Transparent",
          value: 0.5,
        },
        {
          source: "Secure technology networks",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Secure technology networks",
          target: "Flexible",
          value: 0.5,
        },
        {
          source: "Reliable communications technology",
          target: "Robustness",
          value: 1,
        },
        {
          source:
            "Integration of green and blue infrastructure into city policy and projects",
          target: "Integration",
          value: 1,
        },
        {
          source: "Diverse and affordable transport networks",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Diverse and affordable transport networks",
          target: "Diversity",
          value: 0.25,
        },
        {
          source: "Diverse and affordable transport networks",
          target: "Inclusive",
          value: 0.25,
        },
        {
          source: "Diverse and affordable transport networks",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Adequate continuity for critical assets & services",
          target: "Robustness",
          value: 0.33,
        },
        {
          source: "Adequate continuity for critical assets & services",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source: "Adequate continuity for critical assets & services",
          target: "Flexible",
          value: 0.33,
        },
        {
          source:
            "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Natural elements, mangrove, hills, rivers, plantations, among others",
          target: "Integration",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Appropriate government decision-making",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Effective co-ordination with other government bodies",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Proactive multi-stakeholder collaboration",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Effective emergency response services",
          value: 1,
        },
        {
          source: "Effective emergency response services",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Effective emergency response services",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source: "Effective emergency response services",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source: "Effective emergency response services",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Institutional",
          target: "Disaster management authority have sufficient staffing capacity",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Consultative planning process",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Comprehensive government emergency management",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Comprehensive city monitoring & data management",
          value: 1,
        },
        {
          source: "Comprehensive city monitoring & data management",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Comprehensive city monitoring & data management",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Institutional",
          target: "Appropriate land use and zoning",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Robust planning approval process",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Well-managed public finances",
          value: 1,
        },
        {
          source: "Well-managed public finances",
          target: "Redundancy",
          value: 0.5,
        },
        {
          source: "Well-managed public finances",
          target: "Transparent",
          value: 0.5,
        },
        {
          source: "Institutional",
          target: "Informal development areas",
          value: 1,
        },
        {
          source: "Informal development areas",
          target: "Integration",
          value: 0.33,
        },
        {
          source: "Informal development areas",
          target: "Inclusive",
          value: 0.33,
        },
        {
          source: "Institutional",
          target:
            "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
          value: 1,
        },
        {
          source:
            "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
          target: "Robustness",
          value: 0.25,
        },
        {
          source:
            "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source:
            "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source:
            "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
          target: "Integration",
          value: 0.25,
        },
        {
          source: "Institutional",
          target: "Urban development to promote resilience",
          value: 1,
        },
        {
          source: "Urban development to promote resilience",
          target: "Robustness",
          value: 0.33,
        },
        {
          source: "Urban development to promote resilience",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source: "Urban development to promote resilience",
          target: "Integration",
          value: 0.33,
        },
        {
          source: "Institutional",
          target: "Building codes or standards address hazards and risks",
          value: 1,
        },
        {
          source: "Building codes or standards address hazards and risks",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Building codes or standards address hazards and risks",
          target: "Flexible",
          value: 0.5,
        },
        {
          source: "Institutional",
          target: "Enforcement and verification of zoning bulding zoning and regulations",
          value: 1,
        },
        {
          source: "Enforcement and verification of zoning bulding zoning and regulations",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Institutional",
          target: "FAIR Data sharing to enhance resilience",
          value: 1,
        },
        {
          source: "FAIR Data sharing to enhance resilience",
          target: "Transparent",
          value: 1,
        },
        {
          source: "Institutional",
          target:
            "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
          value: 1,
        },
        {
          source:
            "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
          target: "Robustness",
          value: 0.33,
        },
        {
          source:
            "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source:
            "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
          target: "Reflective",
          value: 0.33,
        },
        {
          source: "Institutional",
          target: "Proactive corruption prevention",
          value: 1,
        },
        {
          source: "Proactive corruption prevention",
          target: "Transparent",
          value: 1,
        },
        {
          source: "Institutional",
          target: "Land use designations",
          value: 1,
        },
        {
          source: "Land use designations",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Land use designations",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Institutional",
          target: "Changes in land use designations",
          value: 1,
        },
        {
          source: "Changes in land use designations",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Changes in land use designations",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Institutional",
          target:
            "Disaster and risk reduction in urban planning instruments according to Sendai framework",
          value: 1,
        },
        {
          source:
            "Disaster and risk reduction in urban planning instruments according to Sendai framework",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Disaster and risk reduction in urban planning instruments according to Sendai framework",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Institutional",
          target:
            "Vulnerability mapping and monitoring (vulnerable groups and assets, dissaster scenario analysis)",
          value: 1,
        },
        {
          source:
            "Vulnerability mapping and monitoring (vulnerable groups and assets, dissaster scenario analysis)",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Vulnerability mapping and monitoring (vulnerable groups and assets, dissaster scenario analysis)",
          target: "Reflective",
          value: 0.5,
        },
        {
          source: "Institutional",
          target:
            "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
          value: 1,
        },
        {
          source:
            "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
          target: "Reflective",
          value: 0.5,
        },
        {
          source: "Institutional",
          target: "Early warning system and reaching level",
          value: 1,
        },
        {
          source: "Early warning system and reaching level",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Early warning system and reaching level",
          target: "Reflective",
          value: 0.5,
        },
        {
          source: "Institutional",
          target: "Integration of resilience in city functions / portfolios",
          value: 1,
        },
        {
          source: "Integration of resilience in city functions / portfolios",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Integration of resilience in city functions / portfolios",
          target: "Integration",
          value: 0.5,
        },
        {
          source: "Institutional",
          target:
            "Emergency operations centre: interoperability and inter-agency implementation and coordination",
          value: 1,
        },
        {
          source:
            "Emergency operations centre: interoperability and inter-agency implementation and coordination",
          target: "Robustness",
          value: 0.25,
        },
        {
          source:
            "Emergency operations centre: interoperability and inter-agency implementation and coordination",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source:
            "Emergency operations centre: interoperability and inter-agency implementation and coordination",
          target: "Integration",
          value: 0.25,
        },
        {
          source:
            "Emergency operations centre: interoperability and inter-agency implementation and coordination",
          target: "Reflective",
          value: 0.25,
        },
        {
          source: "Institutional",
          target: "Disaster management / preparedness / emergency response plan",
          value: 1,
        },
        {
          source: "Disaster management / preparedness / emergency response plan",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Disaster management / preparedness / emergency response plan",
          target: "Integration",
          value: 0.25,
        },
        {
          source: "Disaster management / preparedness / emergency response plan",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source: "Disaster management / preparedness / emergency response plan",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Institutional",
          target:
            "Appropriately land use planning considering risk, hazards and vulnerability",
          value: 1,
        },
        {
          source:
            "Appropriately land use planning considering risk, hazards and vulnerability",
          target: "Robustness",
          value: 0.25,
        },
        {
          source:
            "Appropriately land use planning considering risk, hazards and vulnerability",
          target: "Diversity",
          value: 0.25,
        },
        {
          source:
            "Appropriately land use planning considering risk, hazards and vulnerability",
          target: "Integration",
          value: 0.25,
        },
        {
          source:
            "Appropriately land use planning considering risk, hazards and vulnerability",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Institutional",
          target:
            "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
          value: 1,
        },
        {
          source:
            "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
          target: "Robustness",
          value: 0.25,
        },
        {
          source:
            "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source:
            "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
          target: "Integration",
          value: 0.25,
        },
        {
          source:
            "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Institutional",
          target: "Projected changes in location of vulnerable populations",
          value: 1,
        },
        {
          source: "Projected changes in location of vulnerable populations",
          target: "Inclusive",
          value: 0.5,
        },
        {
          source: "Projected changes in location of vulnerable populations",
          target: "Flexible",
          value: 0.5,
        },
        {
          source: "Institutional",
          target: "Adequate access to quality healthcare",
          value: 1,
        },
        {
          source: "Adequate access to quality healthcare",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Adequate access to quality healthcare",
          target: "Diversity",
          value: 0.25,
        },
        {
          source: "Adequate access to quality healthcare",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source: "Adequate access to quality healthcare",
          target: "Inclusive",
          value: 0.25,
        },
        {
          source: "Institutional",
          target: "Emergency medical care",
          value: 1,
        },
        {
          source: "Emergency medical care",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Emergency medical care",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source: "Emergency medical care",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source: "Emergency medical care",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Institutional",
          target: "Robust public health systems",
          value: 1,
        },
        {
          source: "Robust public health systems",
          target: "Robustness",
          value: 0.33,
        },
        {
          source: "Robust public health systems",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source: "Robust public health systems",
          target: "Flexible",
          value: 0.33,
        },
        {
          source: "Institutional",
          target: "Security services: fire services, police stations, etc.",
          value: 1,
        },
        {
          source: "Security services: fire services, police stations, etc.",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Security services: fire services, police stations, etc.",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source: "Security services: fire services, police stations, etc.",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source: "Security services: fire services, police stations, etc.",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Robust planning approval process",
          target: "Robustness",
          value: 1,
        },
        {
          source: "Appropriate land use and zoning",
          target: "Robustness",
          value: 0.33,
        },
        {
          source: "Appropriate land use and zoning",
          target: "Diversity",
          value: 0.33,
        },
        {
          source: "Appropriate land use and zoning",
          target: "Integration",
          value: 0.33,
        },
        {
          source: "Comprehensive government emergency management",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Comprehensive government emergency management",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source: "Comprehensive government emergency management",
          target: "Resourcefulness",
          value: 0.25,
        },
        {
          source: "Comprehensive government emergency management",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Consultative planning process",
          target: "Integration",
          value: 0.33,
        },
        {
          source: "Consultative planning process",
          target: "Inclusive",
          value: 0.33,
        },
        {
          source: "Consultative planning process",
          target: "Transparent",
          value: 0.33,
        },
        {
          source: "Disaster management authority have sufficient staffing capacity",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Disaster management authority have sufficient staffing capacity",
          target: "Resourcefulness",
          value: 0.5,
        },
        {
          source: "Proactive multi-stakeholder collaboration",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Proactive multi-stakeholder collaboration",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source: "Proactive multi-stakeholder collaboration",
          target: "Integration",
          value: 0.25,
        },
        {
          source: "Proactive multi-stakeholder collaboration",
          target: "Inclusive",
          value: 0.25,
        },
        {
          source: "Effective co-ordination with other government bodies",
          target: "Integration",
          value: 1,
        },
        {
          source: "Appropriate government decision-making",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source: "Appropriate government decision-making",
          target: "Integration",
          value: 0.33,
        },
        {
          source: "Appropriate government decision-making",
          target: "Transparent",
          value: 0.33,
        },
        {
          source: "Economic",
          target: "Local business development and innovation",
          value: 1,
        },
        {
          source: "Economic",
          target: "Supportive financing mechanisms",
          value: 1,
        },
        {
          source: "Economic",
          target: "Comprehensive business continuity planning",
          value: 1,
        },
        {
          source: "Economic",
          target: "Diverse economic base",
          value: 1,
        },
        {
          source: "Economic",
          target: "Attractive business environment",
          value: 1,
        },
        {
          source: "Economic",
          target: "Strong integration with regional & global economies",
          value: 1,
        },
        {
          source: "Strong integration with regional & global economies",
          target: "Integration",
          value: 1,
        },

        {
          source: "Economic",
          target: "Industrial areas including ports, industrial zones, and factories",
          value: 1,
        },
        {
          source: "Industrial areas including ports, industrial zones, and factories",
          target: "Diversity",
          value: 1,
        },
        {
          source: "Economic",
          target:
            "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
          value: 1,
        },
        {
          source:
            "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
          target: "Redundancy",
          value: 1,
        },
        {
          source: "Economic",
          target: "Businesses with a documented business continuity plan",
          value: 1,
        },
        {
          source: "Businesses with a documented business continuity plan",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Businesses with a documented business continuity plan",
          target: "Flexible",
          value: 0.5,
        },
        {
          source: "Economic",
          target: "Knowledge to funding opportunities (for local economy and recovery)",
          value: 1,
        },
        {
          source: "Knowledge to funding opportunities (for local economy and recovery)",
          target: "Redundancy",
          value: 1,
        },
        {
          source: "Economic",
          target:
            "Level of insurance cover exists in the city, across all sectors - business and community",
          value: 1,
        },
        {
          source:
            "Level of insurance cover exists in the city, across all sectors - business and community",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Level of insurance cover exists in the city, across all sectors - business and community",
          target: "Redundancy",
          value: 0.5,
        },
        {
          source: "Economic",
          target: "Economic impact",
          value: 1,
        },
        {
          source: "Economic impact",
          target: "Rebustness",
          value: 1,
        },

        {
          source: "Economic",
          target: "Incentives for business and society to support resilience building",
          value: 1,
        },
        {
          source: "Incentives for business and society to support resilience building",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Incentives for business and society to support resilience building",
          target: "Redundancy",
          value: 0.51,
        },
        {
          source: "Economic",
          target: "Planned investments",
          value: 1,
        },
        {
          source: "Planned investments",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Planned investments",
          target: "Redundancy",
          value: 0.5,
        },
        {
          source: "Economic",
          target: "Inclusive labour policies",
          value: 1,
        },
        {
          source: "Inclusive labour policies",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Economic",
          target:
            "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
          value: 1,
        },
        {
          source:
            "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
          target: "Diversity",
          value: 1,
        },
        {
          source: "Economic",
          target: "Changes in the overall city's boundaries",
          value: 1,
        },
        {
          source: "Changes in the overall city's boundaries",
          target: "Flexible",
          value: 1,
        },
        {
          source: "Economic",
          target: "Financial plan and budget for resilience, including contingency funds",
          value: 1,
        },
        {
          source: "Financial plan and budget for resilience, including contingency funds",
          target: "Robustness",
          value: 0.25,
        },
        {
          source: "Financial plan and budget for resilience, including contingency funds",
          target: "Redundancy",
          value: 0.25,
        },
        {
          source: "Financial plan and budget for resilience, including contingency funds",
          target: "Integration",
          value: 0.25,
        },
        {
          source: "Financial plan and budget for resilience, including contingency funds",
          target: "Flexible",
          value: 0.25,
        },
        {
          source: "Economic",
          target: "Projected changes to population densities and economic activity",
          value: 1,
        },
        {
          source: "Projected changes to population densities and economic activity",
          target: "Flexible",
          value: 1,
        },
        {
          source: "Economic",
          target: "Densities",
          value: 1,
        },
        {
          source: "Densities",
          target: "Flexible",
          value: 1,
        },
        {
          source: "Attractive business environment",
          target: "Redundancy",
          value: 0.5,
        },
        {
          source: "Attractive business environment",
          target: "Diversity",
          value: 0.5,
        },
        {
          source: "Diverse economic base",
          target: "Diversity",
          value: 1,
        },
        {
          source: "Comprehensive business continuity planning",
          target: "Robustness",
          value: 0.33,
        },
        {
          source: "Comprehensive business continuity planning",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source: "Comprehensive business continuity planning",
          target: "Flexible",
          value: 0.33,
        },
        {
          source: "Supportive financing mechanisms",
          target: "Redundancy",
          value: 1,
        },
        {
          source: "Local business development and innovation",
          target: "Diversity",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Safe & affordable housing",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Inclusive access to safe drinking water",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Adequate affordable energy supply",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Accessibility to training materials (language)",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Sufficient affordable food supply",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Grassroots or community organizations participating in pre-event planning and post event response",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Accessible criminal and civil justice",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Training programmes provided to the most vulnerable and at need populations",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Main public facilities: university, schools, health centres, markets, etc.",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Social services infrastructure, including schools, hospitals, and clinics",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Practices and drills involving public and professionals",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Accessible criminal & civil justice",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Widespread community awareness & preparedness",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Strong city-wide identity & culture",
          value: 1,
        },
        {
          source: "Strong city-wide identity & culture",
          target: "Inclusive",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Adequate education for all",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Effective sanitation",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Local community support",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Cohesive communities",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Actively engaged citizens",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Access to all the skills and experience to respond/reduce risks and respond to disaster",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Exchange knowledge and learn from other cities facing similar challenges",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Citizen engagement and communications in relation to disaster resilience and recovery",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Major community buildings, religious buildings, and historic/cultural assets",
          value: 1,
        },
        {
          source:
            "Major community buildings, religious buildings, and historic/cultural assets",
          target: "Inclusive",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Safe places/havens and the evacuation routes",
          value: 1,
        },
        {
          source: "Safe places/havens and the evacuation routes",
          target: "Transparent",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
          value: 1,
        },
        {
          source:
            "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
          target: "Resourcefulness",
          value: 0.5,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Awareness of equipment and supply needed + provision",
          value: 1,
        },
        {
          source: "Awareness of equipment and supply needed + provision",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Awareness of equipment and supply needed + provision",
          target: "Flexible",
          value: 0.5,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Effective systems to deter crime",
          value: 1,
        },
        {
          source: "Effective systems to deter crime",
          target: "Robustness",
          value: 0.33,
        },
        {
          source: "Effective systems to deter crime",
          target: "Redundancy",
          value: 0.33,
        },
        {
          source: "Effective systems to deter crime",
          target: "Flexible",
          value: 0.33,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "High levels of crime are observed",
          value: 1,
        },
        {
          source: "High levels of crime are observed",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "High levels of crime are observed",
          target: "Flexible",
          value: 0.5,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target: "Relevant skills & training",
          value: 1,
        },
        {
          source: "Relevant skills & training",
          target: "Resourcefulness",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
          value: 1,
        },
        {
          source:
            "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
          target: "Integration",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Awareness of functions or services that natural capital provides for the city",
          value: 1,
        },
        {
          source:
            "Awareness of functions or services that natural capital provides for the city",
          target: "Integration",
          value: 1,
        },
        {
          source: computed(() => t("echarts.social.name")),
          target:
            "Public education towards awareness of hazard, risk and disaster information",
          value: 1,
        },
        {
          source:
            "Public education towards awareness of hazard, risk and disaster information",
          target: "Inclusive",
          value: 1,
        },
        {
          source:
            "Citizen engagement and communications in relation to disaster resilience and recovery",
          target: "Inclusive",
          value: 1,
        },
        {
          source:
            "Exchange knowledge and learn from other cities facing similar challenges",
          target: "Reflective",
          value: 1,
        },
        {
          source: "Actively engaged citizens",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Cohesive communities",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Local community support",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Effective sanitation",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Effective sanitation",
          target: "Inclusive",
          value: 0.5,
        },
        {
          source: "Adequate education for all",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Widespread community awareness & preparedness",
          target: "Inclusive",
          value: 0.5,
        },
        {
          source: "Widespread community awareness & preparedness",
          target: "Robustness",
          value: 0.5,
        },
        {
          source: "Accessible criminal & civil justice",
          target: "Transparent",
          value: 1,
        },
        {
          source: "Practices and drills involving public and professionals",
          target: "Robustness",
          value: 1,
        },
        {
          source:
            "Access to all the skills and experience to respond/reduce risks and respond to disaster",
          target: "Resourcefulness",
          value: 1,
        },
        {
          source:
            "Social services infrastructure, including schools, hospitals, and clinics",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Social services infrastructure, including schools, hospitals, and clinics",
          target: "Inclusive",
          value: 0.5,
        },
        {
          source:
            "Main public facilities: university, schools, health centres, markets, etc.",
          target: "Robustness",
          value: 0.5,
        },
        {
          source:
            "Main public facilities: university, schools, health centres, markets, etc.",
          target: "Inclusive",
          value: 0.5,
        },
        {
          source:
            "Training programmes provided to the most vulnerable and at need populations",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Accessible criminal and civil justice",
          target: "Inclusive",
          value: 1,
        },
        {
          source:
            "Grassroots or community organizations participating in pre-event planning and post event response",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Sufficient affordable food supply",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Accessibility to training materials (language)",
          target: "Inclusive",
          value: 1,
        },

        {
          source: "Safe & affordable housing",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Adequate affordable energy supply",
          target: "Inclusive",
          value: 1,
        },
        {
          source: "Inclusive access to safe drinking water",
          target: "Inclusive",
          value: 1,
        },
      ],
      levels: [
        { depth: SANKEYLEVELS.LEVEL1 },
        {
          depth: SANKEYLEVELS.LEVEL2,
          select: { itemStyle: { borderColor: "green", borderWidth: 5 } },
        },
        { depth: SANKEYLEVELS.LEVEL3 },
        { depth: SANKEYLEVELS.LEVEL4 },
      ],
    },
  };
  // Population Legend Grid Option
  const gridData = [
    [0, 0, populationInaccessibleColor[0]],
    [0, 1, populationInaccessibleColor[1]],
    [0, 2, populationInaccessibleColor[2]],
    [0, 3, populationInaccessibleColor[3]],
    [0, 4, populationInaccessibleColor[4]],
    [1, 0, populationAccessibleColor[0]],
    [1, 1, populationAccessibleColor[1]],
    [1, 2, populationAccessibleColor[2]],
    [1, 3, populationAccessibleColor[3]],
    [1, 4, populationAccessibleColor[4]],
  ];
  const populationLegendOption = {
    grid: {
      left: "10%",
      right: 0,
      top: "2%",
      bottom: "7%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "Accessible",
      nameLocation: "middle",
      nameGap: 20,
      data: ["No", "Yes"],
      splitLine: { show: false },
      nameTextStyle: {
        color: "#2c3e50",
        fontSize: 12,
        fontFamily: "Arial",
        fontStyle: "italic",
      },
      axisLabel: {
        color: "#34495e",
        fontSize: 12,
        fontFamily: "Arial",
        fontStyle: "normal",
      },
    },
    yAxis: {
      type: "category",
      name: "Population / km\u00B2",
      nameLocation: "middle",
      nameGap: 25,
      data: ["5", "15", "25", "35", ">35"],
      splitLine: { show: false },
      boundaryGap: true,
      nameTextStyle: {
        color: "#2c3e50",
        fontSize: 12,
        fontFamily: "Arial",
        fontStyle: "italic",
      },
      axisLabel: {
        color: "#34495e",
        fontSize: 13,
        fontFamily: "Arial",
        fontStyle: "normal",
      },
    },
    series: [
      {
        name: "Grid",
        type: "custom",
        renderItem: function (params: any, api: any) {
          const xValue = api.value(0);
          const yValue = api.value(1);
          const start = api.coord([xValue, yValue]);
          const size = api.size([1, 1]);
          return {
            type: "rect",
            shape: {
              x: start[0] - size[0] / 2,
              y: start[1] - size[1] / 2,
              width: size[0],
              height: size[1],
            },
            style: {
              fill: api.value(2),
            },
          };
        },
        data: gridData,
      },
    ],
  };

  return {
    SANKEYLEVELS,
    sunburstData,
    sunburstDimension,
    sunburstIndicator,
    sunburstColorSet,
    sunburstColorConvertion,
    sunburstOption,
    sunburstOption1,
    sunburstOption2,
    sankeyOption,
    populationLegendOption,
  };
});
export default useEchartsStore;
