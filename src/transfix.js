// transfix.js
export default function fix(transtion) {
    return function(node, params){
        Object.defineProperty(node, 'ownerDocument', { get: function() { return {head: node.parentNode}; } });
        return transtion(node, params)
    }
}