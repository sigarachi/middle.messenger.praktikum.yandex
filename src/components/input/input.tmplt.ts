export const template = `
    <div>
        <input class="form-input {{className}}"  placeholder="{{placeholder}}" value="{{value}}" name="{{name}}" data-id="{{name}}" type="{{type}}" > 
        <div class="form-input-message hidden">
            {{errorText}}
        </div>
    </div>
`;
