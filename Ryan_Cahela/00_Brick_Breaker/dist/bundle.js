(()=>{var o=document.getElementById("board"),i=o.getContext("2d"),e=o.width,n=o.height,t=0,r={position:{x:0,y:0},direction:{x:1,y:0},dimension:{x:100,y:100},color:"red",speed:500};function c(o){var i=o.direction.x;(i>1||i<-1)&&console.error("x is ".concat(i)),o.direction.x=-o.direction.x}requestAnimationFrame((function o(s){requestAnimationFrame(o);var d=s/1e3,l=d-t;t=d,i.clearRect(0,0,e,n),r.position.x>e-r.dimension.x&&(console.log("beep"),c(r)),r.position.x<0&&(console.log("boop"),c(r)),r.position.x+=r.speed*r.direction.x*l,i.fillStyle=r.color,i.fillRect(r.position.x,r.position.y,100,100)}))})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8wMF9Ccmlja19CcmVha2VyLy4vbWFpbi5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIldJRFRIIiwid2lkdGgiLCJIRUlHSFQiLCJoZWlnaHQiLCJ0aW1lT2ZMYXN0RnJhbWUiLCJzcXVhcmUiLCJwb3NpdGlvbiIsIngiLCJ5IiwiZGlyZWN0aW9uIiwiZGltZW5zaW9uIiwiY29sb3IiLCJzcGVlZCIsImZsaXBEaXJlY3Rpb25YIiwiZW50aXR5IiwiY29uc29sZSIsImVycm9yIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibG9vcCIsInRvdGFsVGltZUVsYXBzZWRNaWxpc2Vjb25kcyIsImN1cnJlbnRUaW1lIiwiZGVsdGFUaW1lIiwiY2xlYXJSZWN0IiwibG9nIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiXSwibWFwcGluZ3MiOiJNQUFBLElBQU1BLEVBQVNDLFNBQVNDLGVBQWUsU0FDakNDLEVBQU1ILEVBQU9JLFdBQVcsTUFDeEJDLEVBQVFMLEVBQU9NLE1BQ2ZDLEVBQVNQLEVBQU9RLE9BR2xCQyxFQUFrQixFQUVoQkMsRUFBUyxDQUNiQyxTQUFVLENBQUVDLEVBQUcsRUFBR0MsRUFBRyxHQUNyQkMsVUFBVyxDQUFFRixFQUFHLEVBQUdDLEVBQUcsR0FDdEJFLFVBQVcsQ0FBRUgsRUFBRyxJQUFLQyxFQUFHLEtBQ3hCRyxNQUFPLE1BQ1BDLE1BQU8sS0FnQ1QsU0FBU0MsRUFBZUMsR0FBUSxJQUN0QlAsRUFBTU8sRUFBT0wsVUFBYkYsR0FDSkEsRUFBSSxHQUFLQSxHQUFLLElBQUdRLFFBQVFDLE1BQVIsZUFBc0JULElBQzNDTyxFQUFPTCxVQUFVRixHQUFLTyxFQUFPTCxVQUFVRixFQUx6Q1UsdUJBM0JBLFNBQVNDLEVBQUtDLEdBQ1pGLHNCQUFzQkMsR0FDdEIsSUFBTUUsRUFBY0QsRUFBOEIsSUFDNUNFLEVBQVlELEVBQWNoQixFQUNoQ0EsRUFBa0JnQixFQUdsQnRCLEVBQUl3QixVQUFVLEVBQUcsRUFBR3RCLEVBQU9FLEdBR3ZCRyxFQUFPQyxTQUFTQyxFQUFJUCxFQUFRSyxFQUFPSyxVQUFVSCxJQUMvQ1EsUUFBUVEsSUFBSSxRQUNaVixFQUFlUixJQUdiQSxFQUFPQyxTQUFTQyxFQUFJLElBQ3RCUSxRQUFRUSxJQUFJLFFBQ1pWLEVBQWVSLElBR2pCQSxFQUFPQyxTQUFTQyxHQUFLRixFQUFPTyxNQUFRUCxFQUFPSSxVQUFVRixFQUFJYyxFQUd6RHZCLEVBQUkwQixVQUFZbkIsRUFBT00sTUFDdkJiLEVBQUkyQixTQUFTcEIsRUFBT0MsU0FBU0MsRUFBR0YsRUFBT0MsU0FBU0UsRUFBRyxJQUFLLFMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5jb25zdCBXSURUSCA9IGNhbnZhcy53aWR0aDtcbmNvbnN0IEhFSUdIVCA9IGNhbnZhcy5oZWlnaHQ7XG5cbmxldCBkZWx0YVRpbWUgPSAwO1xubGV0IHRpbWVPZkxhc3RGcmFtZSA9IDA7XG5cbmNvbnN0IHNxdWFyZSA9IHtcbiAgcG9zaXRpb246IHsgeDogMCwgeTogMCB9LFxuICBkaXJlY3Rpb246IHsgeDogMSwgeTogMCB9LFxuICBkaW1lbnNpb246IHsgeDogMTAwLCB5OiAxMDAgfSxcbiAgY29sb3I6IFwicmVkXCIsXG4gIHNwZWVkOiA1MDAsXG59O1xuXG5mdW5jdGlvbiBsb29wKHRvdGFsVGltZUVsYXBzZWRNaWxpc2Vjb25kcykge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gIGNvbnN0IGN1cnJlbnRUaW1lID0gdG90YWxUaW1lRWxhcHNlZE1pbGlzZWNvbmRzIC8gMTAwMDsgLy9jb252ZXJ0IHRvIHNlY29uZHNcbiAgY29uc3QgZGVsdGFUaW1lID0gY3VycmVudFRpbWUgLSB0aW1lT2ZMYXN0RnJhbWU7XG4gIHRpbWVPZkxhc3RGcmFtZSA9IGN1cnJlbnRUaW1lO1xuXG4gIC8vY2xlYXIgZ2FtZSBzY3JlZW5cbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBXSURUSCwgSEVJR0hUKTtcblxuICAvL21vdmUgY3ViZVxuICBpZiAoc3F1YXJlLnBvc2l0aW9uLnggPiBXSURUSCAtIHNxdWFyZS5kaW1lbnNpb24ueCkge1xuICAgIGNvbnNvbGUubG9nKFwiYmVlcFwiKTtcbiAgICBmbGlwRGlyZWN0aW9uWChzcXVhcmUpO1xuICB9XG5cbiAgaWYgKHNxdWFyZS5wb3NpdGlvbi54IDwgMCkge1xuICAgIGNvbnNvbGUubG9nKFwiYm9vcFwiKTtcbiAgICBmbGlwRGlyZWN0aW9uWChzcXVhcmUpO1xuICB9XG5cbiAgc3F1YXJlLnBvc2l0aW9uLnggKz0gc3F1YXJlLnNwZWVkICogc3F1YXJlLmRpcmVjdGlvbi54ICogZGVsdGFUaW1lO1xuXG4gIC8vZHJhdyBjdWJlXG4gIGN0eC5maWxsU3R5bGUgPSBzcXVhcmUuY29sb3I7XG4gIGN0eC5maWxsUmVjdChzcXVhcmUucG9zaXRpb24ueCwgc3F1YXJlLnBvc2l0aW9uLnksIDEwMCwgMTAwKTtcbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG5mdW5jdGlvbiBmbGlwRGlyZWN0aW9uWChlbnRpdHkpIHtcbiAgY29uc3QgeyB4IH0gPSBlbnRpdHkuZGlyZWN0aW9uO1xuICBpZiAoeCA+IDEgfHwgeCA8IC0xKSBjb25zb2xlLmVycm9yKGB4IGlzICR7eH1gKTtcbiAgZW50aXR5LmRpcmVjdGlvbi54ID0gLWVudGl0eS5kaXJlY3Rpb24ueDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=