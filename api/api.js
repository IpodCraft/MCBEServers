function getlink(pid) {
var aux = document.createElement("input");
aux.setAttribute("value",`https://mcbeservers.ml/server/${pid}`);
document.body.appendChild(aux);
aux.select();
document.execCommand("copy");
document.body.removeChild(aux);
}

function getTypeServer(version) {
  return document.querySelector(
    `#${version == 'MCBE' ? 'dedicated_bedrock' : 'pocketmine'}>.card-body>.profiletimeline`
  );
}
function getServer({ name, description, images, version, length, date, lastupdate, download, pid }) {
  images = [images[0], images[1], images[2], images[3]];
  getTypeServer(version[0]).innerHTML += `
<div class="sl-item">
  <div class="sl-right">
    <div>
      <h3 class="link">${name}</h3>
	  
      <div class="row">
        ${images
          .map(
            img => `<div class="col-lg-3 col-md-6 mb-3 espacio-img">
          <img src="${
            img ||
            'https://media.airedesantafe.com.ar/p/8639febeae789decce31551e14f3b300/adjuntos/268/imagenes/003/416/0003416558/412x232/smart/minecraftpng.png'
          }" alt="user" class="img-responsive radius w-100 zoomable">
        </div>`
          )
          .join('')}
        <div class="col-md-12 col-xs-12 espacio-izquierdo">
          <p>${description}</p>
        </div>
      </div>
      <blockquote class="mt-2">
        <p>${version[0]} Versión: ${version[1]} -> ${versions[version[0]][version[1]]}</p>
        <p>Tamaño del Archivo: ${length}</p>
        <p>Fecha de Subida: ${date}</p>
		<p>Ultima Actualización: ${lastupdate}</p>
        <a href="${download}" class="btn btn-success text-white"><i class="fa fa-download"></i> Descargar</a>
		<a data-bs-toggle="modal" data-bs-target="#vertical-center-modal2" style="color: #00ADB5" onclick="getlink('${pid}')" class="btn btn-success text-white condition"><i class="fas fa-link"></i></a>
      </blockquote>
    </div>
  </div>
</div>`;
}
let interval;
let Api = () => {
  servers.map(data => getServer(data));
  Api = () => {
    clearInterval(interval);
    interval = null;
  };
};
function fn() {
  return Api();
}

interval = setInterval(fn, 100);
