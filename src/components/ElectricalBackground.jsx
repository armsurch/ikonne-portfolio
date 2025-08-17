import React, { useEffect, useRef } from 'react';
import './ElectricalBackground.css';

const ElectricalBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circuit nodes and connections
    const nodes = [];
    const connections = [];
    const sparks = [];
    
    // Create nodes (circuit points)
    const createNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      nodes.length = 0;
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          brightness: 0.3 + Math.random() * 0.7
        });
      }
    };

    // Create connections between nearby nodes
    const createConnections = () => {
      connections.length = 0;
      const maxDistance = 150;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            connections.push({
              from: i,
              to: j,
              distance: distance,
              maxDistance: maxDistance,
              currentFlow: Math.random(),
              flowSpeed: 0.01 + Math.random() * 0.02,
              flowDirection: Math.random() > 0.5 ? 1 : -1
            });
          }
        }
      }
    };

    // Create electrical sparks
    const createSpark = (x, y) => {
      sparks.push({
        x: x,
        y: y,
        life: 1.0,
        decay: 0.05 + Math.random() * 0.05,
        branches: Array.from({ length: 3 + Math.floor(Math.random() * 4) }, () => ({
          angle: Math.random() * Math.PI * 2,
          length: 20 + Math.random() * 30,
          segments: Array.from({ length: 5 + Math.floor(Math.random() * 5) }, (_, i) => ({
            x: 0,
            y: 0,
            offset: (Math.random() - 0.5) * 10
          }))
        }))
      });
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections (circuit traces)
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        if (!fromNode || !toNode) return;

        // Update current flow
        conn.currentFlow += conn.flowSpeed * conn.flowDirection;
        if (conn.currentFlow > 1 || conn.currentFlow < 0) {
          conn.flowDirection *= -1;
          conn.currentFlow = Math.max(0, Math.min(1, conn.currentFlow));
        }

        // Draw connection line
        const opacity = (1 - conn.distance / conn.maxDistance) * 0.3;
        const currentIntensity = 0.5 + Math.sin(conn.currentFlow * Math.PI) * 0.5;
        
        ctx.strokeStyle = `rgba(100, 149, 237, ${opacity * currentIntensity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Draw current flow indicator
        const flowX = fromNode.x + (toNode.x - fromNode.x) * conn.currentFlow;
        const flowY = fromNode.y + (toNode.y - fromNode.y) * conn.currentFlow;
        
        ctx.fillStyle = `rgba(255, 255, 100, ${currentIntensity * 0.8})`;
        ctx.beginPath();
        ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
        ctx.fill();

        // Occasionally create sparks at high current
        if (currentIntensity > 0.8 && Math.random() < 0.001) {
          createSpark(flowX, flowY);
        }
      });

      // Update and draw nodes (circuit points)
      nodes.forEach(node => {
        node.pulse += node.pulseSpeed;
        const pulseBrightness = 0.5 + Math.sin(node.pulse) * 0.5;
        const brightness = node.brightness * pulseBrightness;
        
        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        gradient.addColorStop(0, `rgba(100, 149, 237, ${brightness * 0.8})`);
        gradient.addColorStop(1, 'rgba(100, 149, 237, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw sparks
      sparks.forEach((spark, index) => {
        spark.life -= spark.decay;
        
        if (spark.life <= 0) {
          sparks.splice(index, 1);
          return;
        }

        spark.branches.forEach(branch => {
          ctx.strokeStyle = `rgba(255, 255, 100, ${spark.life * 0.8})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(spark.x, spark.y);
          
          let currentX = spark.x;
          let currentY = spark.y;
          
          branch.segments.forEach((segment, i) => {
            const progress = (i + 1) / branch.segments.length;
            const targetX = spark.x + Math.cos(branch.angle) * branch.length * progress;
            const targetY = spark.y + Math.sin(branch.angle) * branch.length * progress;
            
            currentX = targetX + segment.offset * (1 - progress);
            currentY = targetY + segment.offset * (1 - progress);
            
            ctx.lineTo(currentX, currentY);
          });
          
          ctx.stroke();
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    createNodes();
    createConnections();
    animate();

    // Recreate connections periodically
    const connectionInterval = setInterval(() => {
      createConnections();
    }, 5000);

    // Mouse interaction - create sparks on click
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createSpark(x, y);
    };

    canvas.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      clearInterval(connectionInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="electrical-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'auto'
      }}
    />
  );
};

export default ElectricalBackground;