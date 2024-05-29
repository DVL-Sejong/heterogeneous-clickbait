function scaleDashboard() {
    const dashboard = document.querySelector('.dashboard');
    const layoutSidenavContent = document.querySelector('#layoutSidenav_content');
    
    const scaleX = layoutSidenavContent.offsetWidth / 1330;
    const scaleY = layoutSidenavContent.offsetHeight / 1045;
    const scale = Math.min(scaleX, scaleY);
    
    dashboard.style.transform = `scale(${scaleX*0.99}, ${scaleY})`;
    
    dashboard.style.transformOrigin = '0 0px';
}

window.addEventListener('resize', scaleDashboard);
scaleDashboard();