import pygame

pygame.init()

screen = pygame.display.set_mode((480, 360))
pygame.display.set_caption('Pygame in VSCode')

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((255, 255, 255))
        for j in range(8):
            if j % 2 == 0:
                pygame.draw.rect(screen, (166, 124, 82), (50 + j*69, 180 + i * 60, 60, 60))
            else:
                pygame.draw.rect(screen, (92, 64, 51),(50 + j*60, 180 + i * 60, 60, 60))
    pygame.display.flip()
pygame.quit()


