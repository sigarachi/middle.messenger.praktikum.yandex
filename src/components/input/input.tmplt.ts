export const template = `
    <div class="{{className}}">
        <input class="form-input" name="{{name}}" data-id="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" > 
        <div class="form-input-message hidden">
            {{errorText}}
        </div>
    </div>
`;
