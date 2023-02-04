window.addEventListener('load', function() {
	var article = document.querySelector('article');
	var ul = document.querySelector('ul');
	var img = ul.querySelectorAll('li');
	var ol = document.querySelector('ol');
	var left = document.querySelector('.button_left');
	var right = document.querySelector('.button_right');
	var num = 0; //确定当前图片小圆点位置
	var flag = true; //节流阀
	//动态生成小圆点
	for (var i = 0; i < img.length; i++) {
		var li = document.createElement('li');
		li.setAttribute('data-index', i);
		img[i].setAttribute('data-index', i);
		ol.appendChild(li);
		// 并且给小圆点绑定事件
		li.addEventListener('click', function() {
			for (var i = 0; i < img.length; i++) {
				ol.children[i].className = '';
			}
			this.className = 'select';
			num = this.getAttribute('data-index');
			animate(ul, -num * 365);
		})
	}
	//小圆点设置默认样式
	ol.children[0].className = 'select';
	var last = ul.children[0].cloneNode(true);
	ul.appendChild(last);
	//鼠标移入显示左右按钮移出隐藏，自动播放暂停开始
	article.addEventListener('mouseover', function() {
		left.style.display = 'block';
		right.style.display = 'block';
		clearInterval(auto);
		auto = null;
	})
	article.addEventListener('mouseleave', function() {
		left.style.display = 'none';
		right.style.display = 'none';
		clearInterval(auto);
		auto = setInterval(function() {
			rightAnimate();
		}, 3000)
	})
	//右侧按钮功能
	right.addEventListener('click', rightAnimate);
	//左侧按钮功能
	left.addEventListener('click', leftAnimate);
	//自动播放
	var auto = setInterval(function() {
		rightAnimate();
	}, 3000)
	//动画缓动函数
	function animate(obj, target, callback) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var step = (target - obj.offsetLeft) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			if (obj.offsetLeft == target) {
				clearInterval(obj.timer);
				callback && callback();
			} else {
				obj.style.left = (obj.offsetLeft + step) + 'px';
			}
		}, 20)
	}
	//右侧按钮
	function rightAnimate() {
		if (flag) {
			flag = false;
			num++;
			if (num == 4) {
				animate(ul, -num * 365, function() {
					flag = true;
				});
				num = 0;
			} else {
				animate(ul, -num * 365, function() {
					flag = true;
				});
			}
			for (var i = 0; i < img.length; i++) {
				ol.children[i].className = '';
			}
			ol.children[num].className = 'select';
		}
	}
	//左侧按钮
	function leftAnimate() {
		if (flag) {
			flag = false;
			num--;
			if (num == -1) {
				num = 3;
			}
			animate(ul, -num * 365, function() {
				flag = true;
			});
			for (var i = 0; i < img.length; i++) {
				ol.children[i].className = '';
			}
			ol.children[num].className = 'select';
		}
	}
})
