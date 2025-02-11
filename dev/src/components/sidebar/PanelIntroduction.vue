<script lang="ts" setup>
import { computed } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import useGeoDataStore from "@/stores/geoDataStore";
import languageSwitcher from "../chart/LanguageSwitcher.vue";
import { cities, CityName } from "@/assets/ts/constants";
import { useI18n } from "vue-i18n";

const geoDataStore = useGeoDataStore();
const sidebarStore = useSidebarStore();
const { locale, getLocaleMessage } = useI18n();
const textData = computed(() => getLocaleMessage(locale.value) as any);
const listData = computed(() => textData.value.sidebar.introductionPanel.usage.list);

// Cities and topics for dropdowns
const cityOptions = computed(() =>
  cities.map((city) => ({
    name: city.name,
    latLng: city.latLng,
    isDisabled: !(city.name === CityName.KRYVYIRIH || city.name === CityName.NIKOPOL),
    isSelected: geoDataStore.city === city.name,
  })),
);
// Handle City Change
const handleCityChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selectedCityName = target.value;
  const city = cities.find((c) => c.name === selectedCityName);

  if (city) {
    geoDataStore.map.flyTo(city.latLng, 12);
    geoDataStore.setCity(city.name);
  }
};
</script>
<template>
  <div class="leaflet-sidebar-pane" id="introduction">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.introductionPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <ul class="list-unstyled ps-0">
        <!-- Description -->
        <li class="mb-1">
          <strong class="fw-bold">
            {{ $t("sidebar.introductionPanel.description.title") }}
          </strong>
          <span class="sidebar-content-text">
            {{ $t("sidebar.introductionPanel.description.text") }}
          </span>
        </li>
        <li class="mb-1" v-if="locale === 'ua'">
          <div>
            <h6
              class="btn btn-outline-primary btn-sm mt-1"
              data-bs-toggle="collapse"
              data-bs-target="#МЕТА"
              aria-expanded="true"
            >
              МЕТА:
            </h6>
            <ul id="МЕТА" class="collapse show">
              <li>
                підвищення міської стійкості та прискорення зусиль з відновлення
                територій,
              </li>
              <li>готовність міст до поточних та майбутніх кризових ситуацій,</li>
              <li>
                більше ефективне та обгрунтоване вирішення проблем та прийняття рішень,
              </li>
              <li>
                покращення взаємодії між структурними підрозділами виконавчого комітету
                міської ради,
              </li>
              <li>
                посилення здатності міст протистояти потенційним загрозам та потрясінням.
              </li>
            </ul>
          </div>
          <div>
            <h5
              type="button"
              class="btn btn-outline-primary mt-1"
              data-bs-toggle="collapse"
              data-bs-target="#МОЖЛИВОСТІ"
              aria-expanded="true"
            >
              МОЖЛИВОСТІ:
            </h5>
            <div id="МОЖЛИВОСТІ" class="collapse show">
              <div>
                <h6
                  type="button"
                  class="btn btn-outline-primary btn-sm mt-1"
                  data-bs-toggle="collapse"
                  data-bs-target="#Технічні"
                  aria-expanded="false"
                >
                  Технічні:
                </h6>
                <ul id="Технічні" class="collapse">
                  <li>
                    вибір інформаційного шару, який відповідає за певну сферу
                    життєдіяльності міста,
                  </li>
                  <li>
                    вибір кількох інформаційних шарів для комплексного аналізу території,
                  </li>
                  <li>
                    доступ до покрокових інструкцій користування прототипом інструментом
                    ARTUR.
                  </li>
                </ul>
              </div>
              <div>
                <h6
                  type="button"
                  class="btn btn-outline-primary btn-sm mt-1"
                  data-bs-toggle="collapse"
                  data-bs-target="#Управлінські"
                  aria-expanded="false"
                >
                  Управлінські:
                </h6>
                <ul id="Управлінські" class="collapse">
                  <li>
                    оцінка та аналіз даних щодо слабких місць, загроз та потреб міста,
                  </li>
                  <li>
                    розрахунок індексу стійкості в цілому та в розрізі окремих індикаторів
                    в динаміці,
                  </li>
                  <li>
                    просторова візуалізація містобудівних показників, надзвичайних
                    ситуацій, слабких місць міста (наприклад, недостатність укриттів),
                  </li>
                  <li>
                    доступ одночасно декількох фахівців до інформації для оперативного
                    реагування на кризові ситуації,
                  </li>
                  <li>
                    доступ до бібліотеки можливих заходів реагування на надзвичайні
                    ситуації,
                  </li>

                  <li>вибір проблем для першочергового вирішення,</li>
                  <li>
                    отримання вихідних даних для розроблення планів комплексного
                    відновлення територій територіальних громад та інших стратегічних
                    документів,
                  </li>

                  <li>
                    якісне представлення важливості потреб донорам та міжнародним
                    організаціям,
                  </li>

                  <li>якісна аргументація запитів на отримання субвенцій.</li>
                </ul>
              </div>
              <div>
                <h6
                  type="button"
                  class="btn btn-outline-primary btn-sm mt-1"
                  data-bs-toggle="collapse"
                  data-bs-target="#ДЛЯ"
                  aria-expanded="false"
                >
                  ДЛЯ:
                </h6>
                <ul id="ДЛЯ" class="collapse">
                  <li>
                    працівників виконавчих комітетів міських рад, відповідальних за
                    розробку та виконання комплексного відновлення територій
                    територіальних громад,
                  </li>
                  <li>планів реагування на надзвичайні ситуації,</li>
                  <li>фахівців з міського розвитку,</li>
                  <li>фахівців просторового планування,</li>
                  <li>інших спеціалістів міського господарства.</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <!-- City Selection -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#city-selector"
            aria-expanded="true"
          >
            {{ $t("sidebar.introductionPanel.selectCity.title") }}
          </button>
          <div class="collapse show mb-1" id="city-selector">
            <p class="sidebar-content-text fw-medium">
              {{ $t("sidebar.introductionPanel.selectCity.text") }}
            </p>
            <div class="form-group">
              <select
                id="city-select"
                class="form-select"
                @change="handleCityChange"
                aria-label="Select a city"
              >
                <option value="" disabled selected>
                  {{ $t("sidebar.introductionPanel.selectCity.default") }}
                </option>
                <option
                  v-for="city in cityOptions"
                  :key="city.name"
                  :value="city.name"
                  :disabled="city.isDisabled"
                  :selected="city.isSelected"
                >
                  {{ $t("cityNames." + city.name) }}
                </option>
              </select>
            </div>
          </div>
        </li>
        <!-- Usage -->
        <li class="mb-1">
          <ul class="ps-3">
            <li class="my-3">
              {{ $t("sidebar.introductionPanel.usage.suggestion") }}
            </li>
          </ul>
          <h6 class="fw-bold">{{ $t("sidebar.introductionPanel.usage.title") }}</h6>
          <p class="sidebar-content-text fw-semibold">
            {{ $t("sidebar.introductionPanel.usage.subtitle") }}
          </p>
          <ol class="list-group list-group-numbered">
            <li
              v-for="(item, index) in listData"
              :key="index"
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 d-flex justify-content-between align-items-start">
                <div>
                  {{ item.loc.source + " " }}
                </div>
                <div class="ms-1">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    @click="sidebarStore.openPanel(index)"
                  >
                    <i class="bi bi-arrow-right-circle"
                      ><span v-if="index == 0">
                        {{ " " + $t("sidebar.indicatorPanel.header") }} </span
                      ><span v-else-if="index == 1">
                        {{ " " + $t("sidebar.dataPanel.header") }} </span
                      ><span v-else-if="index == 2">
                        {{ " " + $t("sidebar.dictionaryPanel.header") }}</span
                      ><span v-else-if="index == 3">
                        {{ " " + $t("sidebar.buttons.documentation") }}</span
                      >
                    </i>
                  </button>
                </div>
              </div>
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>
