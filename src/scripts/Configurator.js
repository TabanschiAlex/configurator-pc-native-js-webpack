const Request = require('./Request');

class Configurator extends Request {
  constructor() {
    super();
    this.init();
  }

  async init() {
    await this.setPage()
  }

  async setPage() {
    this.configPage = document.getElementById('config') || false;

    if (!(localStorage.getItem('isLogIn') === 'true') && this.configPage) {
      return this.configPage.innerHTML =
        `<div class="alert alert-secondary" style="width: 100%;font-size: 16px" role="alert">
          Log in to use the configurator
         </div>`;
    }

    await this.getConfigList();
    this.loadConfigs();
    this.selectConfig();

    if (this.configPage && localStorage.getItem('selectedConfig')) {
      this.showConfigComponents();
    }
    return true;
  }

  loadConfigs() {
    this.selectArea = document.querySelector('.select-config');
    this.selectArea.innerHTML = '<option selected disabled>Select a config</option>';

    for (let i = 0; i < this.configList.length; i++) {
      const option = document.createElement('option');
      option.setAttribute('value', i.toString());
      option.innerText = this.configList[i]['createdAt'];
      this.selectArea.append(option);
    }

    return this.selectArea;
  }

  selectConfig() {
    this.selectArea.addEventListener('change', (e) => {
      localStorage.setItem('selectedConfig', e.target.value);
      this.selectedConfig = this.configList[Number(localStorage.getItem('selectedConfig'))]
      console.log(this.selectedConfig)
      this.showConfigComponents()
    });
  }

  createTemplate() {
    if (!this.selectedConfig) return;

    for (const config of Object.entries(this.selectedConfig)) {
      config[0].includes('')
      console.log(config)
    }
  }

  showConfigComponents() {
    const accordion = document.getElementById('accordionExample');
    const template = this.createTemplate();

    accordion.innerHTML =
            `<div class="card">
                  <div class="card-header" id="headingCpu">
                      <h5 class="mb-0">
                          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseCpu" aria-expanded="true" aria-controls="collapseCpu">
                              CPU
                          </button>
                      </h5>
                  </div>

                  <div id="collapseCpu" class="collapse show" aria-labelledby="headingCpu" data-parent="#accordionExample">
                      <div class="card-body">

                         

                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingMotherboard">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseMotherboard" aria-expanded="false" aria-controls="collapseMotherboard">
                              Motherboard
                          </button>
                      </h5>
                  </div>
                  <div id="collapseMotherboard" class="collapse" aria-labelledby="headingMotherboard" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingGpu">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseGpu" aria-expanded="false" aria-controls="collapseGpu">
                              Gpu
                          </button>
                      </h5>
                  </div>
                  <div id="collapseGpu" class="collapse" aria-labelledby="headingGpu" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingRam">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseRam" aria-expanded="false" aria-controls="collapseRam">
                              Ram
                          </button>
                      </h5>
                  </div>
                  <div id="collapseRam" class="collapse" aria-labelledby="headingRam" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingRom">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseRom" aria-expanded="false" aria-controls="collapseRom">
                              Rom
                          </button>
                      </h5>
                  </div>
                  <div id="collapseRom" class="collapse" aria-labelledby="headingRom" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingPsu">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapsePsu" aria-expanded="false" aria-controls="collapsePsu">
                              Psu
                          </button>
                      </h5>
                  </div>
                  <div id="collapsePsu" class="collapse" aria-labelledby="headingPsu" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingCase">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseCase" aria-expanded="false" aria-controls="collapseCase">
                              Case
                          </button>
                      </h5>
                  </div>
                  <div id="collapseCase" class="collapse" aria-labelledby="headingCase" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingMonitor">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseMonitor" aria-expanded="false" aria-controls="collapseMonitor">
                              Monitor
                          </button>
                      </h5>
                  </div>
                  <div id="collapseMonitor" class="collapse" aria-labelledby="headingMonitor" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingKeyboard">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseKeyboard" aria-expanded="false" aria-controls="collapseKeyboard">
                              Keyboard
                          </button>
                      </h5>
                  </div>
                  <div id="collapseKeyboard" class="collapse" aria-labelledby="headingKeyboard" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>

              <div class="card">
                  <div class="card-header" id="headingMouse">
                      <h5 class="mb-0">
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseMouse" aria-expanded="false" aria-controls="collapseMouse">
                              Mouse
                          </button>
                      </h5>
                  </div>
                  <div id="collapseMouse" class="collapse" aria-labelledby="headingMouse" data-parent="#accordionExample">
                      <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                  </div>
              </div>`
  }

  async addConfig() {

  }

  async remove() {

  }
}

module.exports = new Configurator();
