const width = 700;
const height = 360;

// 여백 추가
const margin = { top: 0, left: 80, right: 50, bottom: 0 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const svg = d3.select('#trajectory')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const zoomG = svg.append('g');

const g = zoomG
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// tree()로 x, y 값을 설정
const treeLayout = d3.tree().size([innerHeight, innerWidth]);
// 줌 기능 추가
svg.call(
    d3.zoom().on('zoom', (event) => {
        zoomG.attr('transform', event.transform);
    })
);

svg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 0)
            .attr('refY', 0)
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('orient', 'auto')
          .append('path')
            .attr('d', 'M10,-5L0,0L10,5')
            .attr('fill', '#000');

const root = d3.hierarchy(data);
const links = treeLayout(root).links();
const linkPathGenerator = d3.linkHorizontal()
    .x(d => d.y + d.bbox.width - 10)
    .y(d => d.x);

const padding = 5;
const rectHeight = 20;

g.selectAll('text')
    .data(root.descendants())
    .enter()
    .append('text')
    .attr('x', d => d.y)
    .attr('y', d => d.x)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'middle')
    .text(d => d.data.name)
    .attr('fill', 'black')
    .attr('transform', d => `translate(${d.y * 2}, 0) scale(-1,1)`)
    .each(function(d) {
        d.bbox = this.getBBox();
    });

g.selectAll('rect')
    .data(root.descendants())
    .enter()
    .insert('rect', 'text')
    .attr('x', d => d.y - d.bbox.width / 2 - padding)
    .attr('y', d => d.x - rectHeight / 2 - padding)
    .attr('width', d => d.bbox.width + 2 * padding)
    .attr('height', rectHeight + 2 * padding)
    .attr('fill', 'rgb(228, 228, 228)');

const lineGenerator = d3.line()
    .x(d => d.x)
    .y(d => d.y - 10);

root.descendants().forEach(d => {
    if (d.parent) {
        // 현재 노드(자식)의 사각형 좌표 계산
        const childRect = {
            x: d.y - d.bbox.width / 2 - padding,
            y: d.x
        };
        // 부모 노드의 사각형 좌표 계산
        const parentRect = {
            x: d.parent.y + d.parent.bbox.width / 2 + padding,
            y: d.parent.x
        };

        // 선의 시작점(부모)과 끝점(자식) 설정
        const points = [
            { x: parentRect.x, y: parentRect.y + rectHeight / 2 },
            { x: childRect.x, y: childRect.y + rectHeight / 2 }
        ];

        // 선 그리기
        g.append('path')
            .attr('d', lineGenerator(points))
            .attr('fill', 'none')
            .attr('marker-end', 'url(#arrow)') // 화살표 마커를 선의 끝에 적용
            .attr('stroke', 'black');
    }
});

svg.attr("transform", "scale(-1, 1)");