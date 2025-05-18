document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const posterContainer = document.getElementById('poster-container');
    const sectionsCountInput = document.getElementById('sections-count');
    const updateSectionsBtn = document.getElementById('update-sections-btn');
    const sectionsContainer = document.getElementById('sections-container');
    const backgroundOpacitySlider = document.getElementById('background-opacity');
    const opacityValueDisplay = document.getElementById('opacity-value');
    
    // 默认logo和背景图片 - 如果用户未上传
    let logoUrl = null;
    let backgroundImageUrl = null;
    // 保存各部分的图片URL
    let sectionImageUrls = {};
    
    // 监听背景透明度变化
    backgroundOpacitySlider.addEventListener('input', function() {
        opacityValueDisplay.textContent = this.value;
        // 实时预览透明度变化
        generateBtn.click();
    });
    
    // 处理logo上传
    const logoUpload = document.getElementById('logo-upload');
    logoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                logoUrl = event.target.result;
                // 图片加载完成后立即更新预览
                generateBtn.click();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 处理背景图片上传
    const backgroundImageUpload = document.getElementById('background-image');
    backgroundImageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                backgroundImageUrl = event.target.result;
                // 背景图片加载完成后立即更新预览
                generateBtn.click();
            };
            reader.readAsDataURL(file);
        }
    });

    // 处理部分内容图片上传
    document.addEventListener('change', function(e) {
        if(e.target.classList.contains('section-image-upload')) {
            const file = e.target.files[0];
            if(file) {
                const sectionNum = e.target.id.replace('section', '').replace('-image', '');
                const reader = new FileReader();
                reader.onload = function(event) {
                    sectionImageUrls[sectionNum] = event.target.result;
                    // 图片加载完成后立即更新预览
                    generateBtn.click();
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // 添加背景覆盖层选项变化监听
    document.getElementById('background-overlay').addEventListener('change', function() {
        // 实时预览覆盖层变化
        generateBtn.click();
    });
    
    // 更新内容部分数量
    updateSectionsBtn.addEventListener('click', function() {
        const count = parseInt(sectionsCountInput.value);
        if(count < 1 || count > 6) {
            alert('内容部分数量应在1到6之间');
            return;
        }
        
        updateSectionInputs(count);
    });
    
    // 根据数量更新内容输入区域
    function updateSectionInputs(count) {
        // 保存现有输入的值
        const existingValues = [];
        const existingSections = sectionsContainer.querySelectorAll('.section-input');
        
        existingSections.forEach((section, index) => {
            const sectionNum = index + 1;
            existingValues.push({
                mainTitle: document.getElementById(`section${sectionNum}-main-title`)?.value || '',
                secondaryTitle: document.getElementById(`section${sectionNum}-secondary-title`)?.value || '',
                title: document.getElementById(`section${sectionNum}-title`)?.value || '',
                emoji: document.getElementById(`section${sectionNum}-emoji`)?.value || '',
                content: document.getElementById(`section${sectionNum}-content`)?.value || ''
            });
        });
        
        // 清空现有输入区域
        sectionsContainer.innerHTML = '';
        
        // 创建指定数量的内容输入区域
        for(let i = 1; i <= count; i++) {
            const values = existingValues[i-1] || { 
                mainTitle: `第${i}部分主标题`,
                secondaryTitle: `第${i}部分副标题`,
                title: `第${i}部分内容标题`, 
                emoji: '', 
                content: '' 
            };
            
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'form-group section-input';
            sectionDiv.dataset.section = i;
            
            sectionDiv.innerHTML = `
                <label>第${i}部分内容</label>
                <!-- 主标题和副标题 -->
                <div class="form-group">
                    <label for="section${i}-main-title">主标题</label>
                    <input type="text" id="section${i}-main-title" placeholder="输入主标题" value="${values.mainTitle}">
                </div>
                <div class="form-group">
                    <label for="section${i}-secondary-title">副标题</label>
                    <input type="text" id="section${i}-secondary-title" placeholder="输入副标题" value="${values.secondaryTitle}">
                </div>
                <div class="title-with-emoji">
                    <input type="text" id="section${i}-title" placeholder="输入内容标题" value="${values.title}">
                    <select id="section${i}-emoji" class="emoji-select">
                        <option value="">无表情</option>
                        <option value="📊" ${values.emoji === '📊' ? 'selected' : ''}>📊</option>
                        <option value="📈" ${values.emoji === '📈' ? 'selected' : ''}>📈</option>
                        <option value="📉" ${values.emoji === '📉' ? 'selected' : ''}>📉</option>
                        <option value="📋" ${values.emoji === '📋' ? 'selected' : ''}>📋</option>
                        <option value="💡" ${values.emoji === '💡' ? 'selected' : ''}>💡</option>
                        <option value="🔍" ${values.emoji === '🔍' ? 'selected' : ''}>🔍</option>
                        <option value="👍" ${values.emoji === '👍' ? 'selected' : ''}>👍</option>
                        <option value="💯" ${values.emoji === '💯' ? 'selected' : ''}>💯</option>
                        <option value="✅" ${values.emoji === '✅' ? 'selected' : ''}>✅</option>
                        <option value="🚀" ${values.emoji === '🚀' ? 'selected' : ''}>🚀</option>
                        <option value="⚙️" ${values.emoji === '⚙️' ? 'selected' : ''}>⚙️</option>
                        <option value="🔔" ${values.emoji === '🔔' ? 'selected' : ''}>🔔</option>
                        <option value="💰" ${values.emoji === '💰' ? 'selected' : ''}>💰</option>
                        <option value="🏢" ${values.emoji === '🏢' ? 'selected' : ''}>🏢</option>
                        <option value="😊" ${values.emoji === '😊' ? 'selected' : ''}>😊</option>
                    </select>
                </div>
                <textarea id="section${i}-content" placeholder="输入第${i}部分内容">${values.content}</textarea>
                
                <!-- 图片上传 -->
                <div class="form-group">
                    <label for="section${i}-image">上传内容图片</label>
                    <input type="file" id="section${i}-image" accept="image/*" class="section-image-upload">
                </div>
            `;
            
            sectionsContainer.appendChild(sectionDiv);
        }
        
        // 更新完内容部分后生成预览
        generateBtn.click();
    }
    
    // 生成海报
    generateBtn.addEventListener('click', function() {
        // 获取用户输入
        const title = document.getElementById('poster-title').value || '一看让管理更从容';
        const subtitle = document.getElementById('poster-subtitle').value || '项目看板面壁来袭！';
        const themeColor = document.getElementById('theme-color').value;
        const bgColor = document.getElementById('background-color').value;
        const textColor = document.getElementById('text-color').value;
        const posterWidth = document.getElementById('poster-width').value || 450;
        const backgroundOpacity = document.getElementById('background-opacity').value;
        const useOverlay = document.getElementById('background-overlay').checked;
        const sectionWidth = document.getElementById('section-width').value || 90;
        const sectionBorderColor = document.getElementById('section-border-color').value;
        const sectionImageBorderColor = document.getElementById('section-image-border-color').value;
        
        // 获取内容部分的数量
        const sectionsCount = document.querySelectorAll('.section-input').length;
        
        // 开始构建海报HTML
        let posterHTML = `
            <div class="poster" style="background-color: ${bgColor}; width: ${posterWidth}px; color: ${textColor};">
        `;
        
        // 添加背景图片（如果有）
        if(backgroundImageUrl) {
            posterHTML += `<img src="${backgroundImageUrl}" class="poster-bg" style="opacity: ${backgroundOpacity};">`;
            if(useOverlay) {
                posterHTML += `<div class="poster-overlay"></div>`;
            }
        }
        
        // 添加标题部分
        posterHTML += `
                <div class="poster-header" style="background-color: ${themeColor};">
                    ${logoUrl ? `<img src="${logoUrl}" class="poster-logo" alt="Logo">` : ''}
                    <div class="poster-title">${title}</div>
                    <div class="poster-subtitle">${subtitle}</div>
                </div>
        `;
        
        // 添加各内容部分
        for(let i = 1; i <= sectionsCount; i++) {
            const mainTitle = document.getElementById(`section${i}-main-title`).value || `第${i}部分主标题`;
            const secondaryTitle = document.getElementById(`section${i}-secondary-title`).value || `第${i}部分副标题`;
            const sectionTitle = document.getElementById(`section${i}-title`).value || `第${i}部分`;
            const sectionEmoji = document.getElementById(`section${i}-emoji`).value;
            const sectionContent = document.getElementById(`section${i}-content`).value;
            const sectionImage = sectionImageUrls[i] || null;
            
            posterHTML += `
                <div class="poster-section" style="width: ${sectionWidth}%; border: 1px solid ${sectionBorderColor};">
                    <div class="section-main-title" style="background-color: ${themeColor};">
                        <span class="section-number" style="color: ${themeColor}; border: 2px solid ${themeColor};">${String(i).padStart(2, '0')}</span>
                        <div class="section-main-title-text">${mainTitle}</div>
                    </div>
                    <div class="section-secondary-title">${secondaryTitle}</div>
                    <div class="section-title">
                        ${sectionTitle}
                        ${sectionEmoji ? `<span class="section-emoji">${sectionEmoji}</span>` : ''}
                    </div>
                    <div class="section-content">
                        ${formatContent(sectionContent)}
                    </div>
                    ${sectionImage ? `
                    <div class="section-image-container">
                        <img src="${sectionImage}" class="section-image" alt="内容图片" style="border-color: ${sectionImageBorderColor};">
                    </div>
                    ` : ''}
                </div>
            `;
        }
        
        // 添加页脚
        posterHTML += `
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
            scale: 2, // 提高图片质量
            logging: true, // 开启日志，便于调试
            imageTimeout: 0, // 不限制图片加载时间
            onclone: function(clonedDoc) {
                // 确保克隆的DOM中背景图片正确加载
                const clonedPoster = clonedDoc.querySelector('.poster');
                const bgImage = clonedPoster.querySelector('.poster-bg');
                if (bgImage && backgroundImageUrl) {
                    bgImage.onload = function() {
                        console.log('背景图片已加载');
                    };
                    bgImage.onerror = function() {
                        console.error('背景图片加载失败');
                    };
                }
            }
        }).then(canvas => {
            // 转换为图片并下载
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = '长海报_' + new Date().getTime() + '.png';
            link.href = imgData;
            link.click();
        }).catch(error => {
            console.error('海报生成失败:', error);
            alert('海报生成失败，请重试');
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
    
    // 监听颜色和宽度变化，实时更新预览
    document.getElementById('theme-color').addEventListener('input', function() {
        generateBtn.click();
    });
    
    document.getElementById('background-color').addEventListener('input', function() {
        generateBtn.click();
    });
    
    document.getElementById('text-color').addEventListener('input', function() {
        generateBtn.click();
    });
    
    document.getElementById('poster-width').addEventListener('input', function() {
        generateBtn.click();
    });
    
    document.getElementById('section-width').addEventListener('input', function() {
        generateBtn.click();
    });
    
    document.getElementById('section-border-color').addEventListener('input', function() {
        generateBtn.click();
    });
    
    document.getElementById('section-image-border-color').addEventListener('input', function() {
        generateBtn.click();
    });
    
    // 初始加载时自动生成一个默认海报
    generateBtn.click();
}); 