export const template = `
    <div class="{{className}}">
        <input class="form-input"  placeholder="{{placeholder}}" value="{{value}}" name="{{name}}" data-id="{{name}}" type="{{type}}" > 
        <div class="form-input-message hidden">
            {{errorText}}
        </div>
    </div>
`;
