//const ic = getPlugin(getPID())
const datosHTML = {
  plugin_no_encontrado: ic => `<div class="col-12 col-lg-12 col-sm-12 com-md-12 mb-4">
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between flex-sm-row flex-column gap-3">
        <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
          <div class="card-title">
            <h2 class="text-nowrap mb-2">No se encontro el plugin</h2>
            <div class="row">
              <div class="col-md-12 col-lg-12 espacio-izquierdo">
                <p>El plugin que usted busca no existe o fue removido de la pagina.</p>
                <p>y/o verifica que la url sea correcta.</p>
                <a href="/plugins" class="btn btn-primary"><i class="fa fa-home"></i> Regresar a Plugins</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  inicio_todos: ic => `${ic.nombre ? `<div class="col-12 col-md-4 col-sm-5 col-lg-3 col-xl-3 mb-4">
    <div class="card border-0 shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
              <img align="left" class="plugin-logo" src="${ic.imagen}">
              <div align="right" class="plugin-logo-versions">
                <span class="espacio-badge badge bg-label-danger rounded-pill">
                <i class="fa fa-upload" aria-hidden="true"></i><b> ${ic.creado}</b></span><br>
                <span class="espacio-badge badge bg-label-warning rounded-pill">
                <i class="fa fa-refresh fa-spin" aria-hidden="true"></i><b> ${ic.ultAct}</b></span>
              </div><br>
              <p class="titulo-otros">${ic.nombre}</p>
              ${ic.pluginVersion ? `<span class="d-block opcion">Plugin versión: <span class="espacio-badge badge bg-label-info rounded-pill">${ic.pluginVersion}</span></span>` : ''}
              ${ic.apiVersion ? `<span class="d-block opcion">API versión: <span class="espacio-badge badge bg-label-success rounded-pill">${ic.apiVersion}</span></span>` : ''}
              <a href="/plugin?${ic.pid}"><button class="btn btn-primary btn-block btn-plugin">
              <i class="fa fa-eye"></i><span class="boton-texto"> Ver ${ic.nombre}</span></button></a>
          </div>
        </div>
      </div>
    </div>
  </div>` : ''}`,
  solo: ic => `<div class="col-12 col-xl-12 mb-4">
  <div class="card border-0 shadow">
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-xl-6">
            <center><img class="img-creaciones" src="${ic.imagen}"></center>
          </div>
          <div class="col-12 col-xl-6">
          <center><p class="titulo-otros">${ic.nombre}</p>
          ${ic.descripcion ? `<blockquote>
            <div class="desc-texto"><b>Descripción</b></div>
            <div class="desc-skin"><span class="d-block opcion">${ic.descripcion}</span></div>
          </blockquote>` : ''}
          ${ic.formato ? `<span class="d-block opcion"><b>Tipo de archivo: </b>${ic.formato}</span>` : ''}
          ${ic.tamaño ? `<span class="d-block opcion"><b>Tamaño del archivo: </b>${ic.tamaño}</span>` : ''}
          ${ic.compatible ? `<span class="d-block opcion"><b>MCBE Versión: </b>${ic.compatible}</span>` : ''}
          <a href="${ic.descarga}"><button class="btn btn-primary">
          <i class="fa fa-download"></i> <span class="boton-texto">Descargar ${ic.nombre}${ic.formato}</span></button></a></center>
          </div>
        </div>
      </div>
    </div>
</div>`,
solo_historial: (ic) => {
  let historialHTML = '';

  if (ic.historial) {
    historialHTML = Object.entries(ic.historial).map(([version, historialItem]) => {
      return `<tr>
        <th class="tabla-resultado-version" scope="row">${historialItem.h_mcbeVersion}</th>
        <td class="tabla-resultado-version">${historialItem.h_tamaño}</td>
        <td>
          <a class="tabla-descarga-boton" href="${historialItem.h_descarga}">.mcpack</a>
        </td>
      </tr>`;
    }).join('');
  }

  return historialHTML;
},
}

function addItems(inHTML, callback) {
  getVersions(([data, versions]) => {
    const html = document.querySelector(inHTML);
    if (html) html.innerHTML += callback(data, versions);
  });
}

function getVersions(callback) {
  fetch('https://mis-assets.pages.dev/Apis/mcbe_servers/plugins.json')
    .then(v => v.text())
    .then(JSON.parse)
    .then(data => {
      const isVersion = value =>
  /^[0-9a-zA-Z]+([.-][0-9a-zA-Z]+)*$/.test(value);
      const versions = Object.keys(data)
        .filter(v => isVersion(v))
        .sort()
        .reverse();
      return [data, versions];
    })
    .then(callback);
}

// TODOS
getVersions(([data, versions]) =>
  versions.map(version => {
    const tags = [
      ...document.querySelectorAll(`.${version}`),
    ];
    if (tags[0])
      tags.map(
        html => (html.innerHTML += data[version].map(datosHTML.inicio_todos).join(''))
      );
  })
);

// SOLO
getVersions(([data, versions]) =>
  versions.map(version =>
    data[version].map(ic => {
      const tags = [
        ...document.querySelectorAll(`.id-${ic.id}`),
      ];
      if (tags[0]) tags.map(html => (html.innerHTML += datosHTML.solo(ic)));
    })
  )
);

// SOLO HISTORIAL
getVersions(([data, versions]) =>
  versions.map(version =>
    data[version].map(ic => {
      const tags = [
        ...document.querySelectorAll(`.hid-${ic.id}`),
      ];
      if (tags[0]) tags.map(html => (html.innerHTML += datosHTML.solo_historial(ic)));
    })
  )
);

/*
function getPID(){
  return location.href.split('?')[1];
}
function getPlugin(pid){
  // "json" debe de ser donde esta la informacion de los plugins
  return fetch('https://mis-assets.pages.dev/Apis/mcbe_servers/plugins.json')
    .then(v => v.text())
    .then(JSON.parse)
    .then(j=>j.PLUGINS.find(p=>p.pid == pid)) // puede ser la informacion del plugin o "undefined"
}
(async () => {let d = await ic; document.querySelector('#PLUGINS').innerHTML = d ? datosHTML.solo(await ic) : datosHTML.plugin_no_encontrado(ic)})()
*/