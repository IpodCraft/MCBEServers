const versions = {
  Api: {
    '4.0.0': '4.18.0',
    '5.0.0': '5.0.X',
    '6.0.0': '6.X.X',
    '7.0.0': '7.X.X',
  },
  MCBE: {
    '1.19.0': '1.19.71',
    '1.20.0': '1.20.X',
  },
};
window.addEventListener('load', ()=>{
   const mcbe = '1.19.0';
   const api = '4.0.0'
   new Vue({
      el: 'div#main-wrapper',
      data: {
        MCBE:`${mcbe} -> ${versions.MCBE[mcbe]}`,
        API:`${api} -> ${versions.Api[api]}`
      },
   });
});
const servers = [
/*  {
//  =####
    name: 'TITULO DEL SERVER O NOMBRE DEL SERVER',
    description: 'DESCRIPCIÓN',
    images: ['', '', '', ''],
    version: ['Api', '4.0.0'],
    length: '00.0MB',
    date: '00/Jul/2022',
	lastupdate: '00/Mes/20XX',
	download: '',
  },
  {
//  =####
    name: 'TITULO DEL SERVER O NOMBRE DEL SERVER',
    description: 'DESCRIPCIÓN',
    images: ['', '', '', ''],
    version: ['MCBE', '1.19.0'],
    length: '00.0MB',
    date: '00/Mes/20XX',
	lastupdate: '00/Mes/20XX',
	download: '',
  }*/
  {
    pid: '=4Nm6',
    name: 'Simple Duels Server',
    description: 'Simple Duels Server es un servidor configurado de forma simple para 24 jugadores que cuenta con 12 arenas y 3 kits distintos de equipamento.<br><br>Puedes probar el servidor entrando a: <a href="minecraft://?addExternalServer=JewelCraft|jewelcraft.tk:13400">jewelcraft.tk:13400</a>',
    images: ['https://img.mcbeservers.ml/=4Nm6/img1.jpg', 'https://img.mcbeservers.ml/=4Nm6/img2.jpg', 'https://img.mcbeservers.ml/=4Nm6/img3.jpg', 'https://img.mcbeservers.ml/=4Nm6/img4.jpg'],
    version: ['Api', '4.0.0'],
    length: '13.6MB',
    date: '26/Ago/2022',
	lastupdate: '16/Oct/2022',
	download: 'https://i0000.clarodrive.com/s/AEfsCzEM72RrpPg/download',
  }
]
