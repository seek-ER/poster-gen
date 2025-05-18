document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const posterContainer = document.getElementById('poster-container');
    
    // 默认logo - 如果用户未上传
    let logoUrl = null;
    
    // 处理logo上传
    const logoUpload = document.getElementById('logo-upload');
    logoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                logoUrl = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 生成海报
    generateBtn.addEventListener('click', function() {
        // 获取用户输入
        const title = document.getElementById('poster-title').value || '一看让管理更从容';
        const subtitle = document.getElementById('poster-subtitle').value || '项目看板面壁来袭！';
        const themeColor = document.getElementById('theme-color').value;
        const bgColor = document.getElementById('background-color').value;
        const textColor = document.getElementById('text-color').value;
        const posterWidth = document.getElementById('poster-width').value || 400;
        
        // 获取各部分内容
        const section1Title = document.getElementById('section1-title').value || '项目看板';
        const section1Emoji = document.getElementById('section1-emoji').value;
        const section1Content = document.getElementById('section1-content').value;
        
        const section2Title = document.getElementById('section2-title').value || '数据代!';
        const section2Emoji = document.getElementById('section2-emoji').value;
        const section2Content = document.getElementById('section2-content').value;
        
        const section3Title = document.getElementById('section3-title').value || '好实用!';
        const section3Emoji = document.getElementById('section3-emoji').value;
        const section3Content = document.getElementById('section3-content').value;
        
        // 创建海报HTML结构
        const posterHTML = `
            <div class="poster" style="background-color: ${bgColor}; width: ${posterWidth}px; color: ${textColor};">
                <div class="poster-header" style="background-color: ${themeColor};">
                    ${logoUrl ? `<img src="${logoUrl}" class="poster-logo" alt="Logo">` : ''}
                    <div class="poster-title">${title}</div>
                    <div class="poster-subtitle">${subtitle}</div>
                </div>
                
                <div class="poster-section">
                    <div class="section-title">
                        <span class="section-number" style="background-color: ${themeColor};">01</span>
                        ${section1Title}
                        ${section1Emoji ? `<span class="section-emoji">${section1Emoji}</span>` : ''}
                    </div>
                    <div class="section-content">
                        ${formatContent(section1Content)}
                    </div>
                </div>
                
                <div class="poster-section">
                    <div class="section-title">
                        <span class="section-number" style="background-color: ${themeColor};">02</span>
                        ${section2Title}
                        ${section2Emoji ? `<span class="section-emoji">${section2Emoji}</span>` : ''}
                    </div>
                    <div class="section-content">
                        ${formatContent(section2Content)}
                    </div>
                </div>
                
                <div class="poster-section">
                    <div class="section-title">
                        <span class="section-number" style="background-color: ${themeColor};">03</span>
                        ${section3Title}
                        ${section3Emoji ? `<span class="section-emoji">${section3Emoji}</span>` : ''}
                    </div>
                    <div class="section-content">
                        ${formatContent(section3Content)}
                    </div>
                </div>
                
                <div class="poster-footer">
                    数据可视化海报生成器 · ${new Date().getFullYear()}
                </div>
            </div>
        `;
        
        // 渲染到容器
        posterContainer.innerHTML = posterHTML;
    });
    
    // 下载海报
    downloadBtn.addEventListener('click', function() {
        if(!posterContainer.querySelector('.poster')) {
            alert('请先生成海报！');
            return;
        }
        
        const poster = posterContainer.querySelector('.poster');
        
        // 使用html2canvas将海报转为图片
        html2canvas(poster, {
            allowTaint: true,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            backgroundColor: null,
            scale: 2 // 提高图片质量
        }).then(canvas => {
            // 转换为图片并下载
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = '长海报_' + new Date().getTime() + '.png';
            link.href = imgData;
            link.click();
        });
    });
    
    // 辅助函数：格式化内容文本，处理bullet points
    function formatContent(content) {
        if (!content) return '';
        
        // 将内容中的每一行转换为HTML段落
        return content.split('\n')
            .map(line => {
                // 处理带有bullet point的行
                if (line.trim().startsWith('●')) {
                    return `<p>${line}</p>`;
                }
                return `<p>${line}</p>`;
            })
            .join('');
    }
    
    // 初始加载时自动生成一个默认海报
    generateBtn.click();
}); 