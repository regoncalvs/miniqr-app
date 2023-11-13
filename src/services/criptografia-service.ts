const chaveCompartilhada = process.env.NEXT_PUBLIC_CHAVE_SIMETRICA;

export async function criptografar(senha: string) {
    const encoder = new TextEncoder();
    const chave = await crypto.subtle.importKey('raw', encoder.encode(chaveCompartilhada), { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
    const iv = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

    const senhaBuffer = encoder.encode(senha);
    const blockSize = 16; 
    const padding = blockSize - (senhaBuffer.byteLength % blockSize);
    const paddedSenha = new Uint8Array(senhaBuffer.byteLength + padding);
    paddedSenha.set(new Uint8Array(senhaBuffer));

    const cifraBuffer = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, chave, paddedSenha);
    const cifraBase64 = btoa(String.fromCharCode(...Array.from(new Uint8Array(cifraBuffer))));


    return cifraBase64;
}
